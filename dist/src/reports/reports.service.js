"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const report_filter_service_1 = require("./report-filter.service");
let ReportsService = class ReportsService {
    prisma;
    reportFilterService;
    reportSelect = {
        id: true,
        userId: true,
        taskId: true,
        clientId: true,
        startTime: true,
        endTime: true,
        durationSeconds: true,
        totalPausedSeconds: true,
        pausedAt: true,
        status: true,
        description: true,
        isManual: true,
        createdAt: true,
        updatedAt: true,
        client: {
            select: {
                id: true,
                name: true,
                billable: true,
            },
        },
        task: {
            select: {
                id: true,
                title: true,
            },
        },
        user: {
            select: {
                id: true,
                name: true,
                email: true,
                systemRole: true,
            },
        },
    };
    constructor(prisma, reportFilterService) {
        this.prisma = prisma;
        this.reportFilterService = reportFilterService;
    }
    async getDashboardData(user, query) {
        const { filters, range } = this.reportFilterService.buildFilters(user, query);
        const where = this.reportFilterService.buildWhereClause(user, filters, range);
        const orderBy = this.reportFilterService.buildOrderBy(filters.sortBy, filters.sortDir);
        const [summary, charts, options, table] = await Promise.all([
            this.loadSummary(where),
            this.loadCharts(where, range),
            this.loadOptions(user, where),
            this.loadTableData(where, orderBy, filters.page, filters.pageSize, query.draw ?? 0),
        ]);
        return {
            range: this.reportFilterService.getDateSqlRange(range),
            filters,
            summary,
            charts,
            options,
            table,
        };
    }
    async getTableData(user, query) {
        const { filters, range } = this.reportFilterService.buildFilters(user, query);
        const where = this.reportFilterService.buildWhereClause(user, filters, range);
        const orderBy = this.reportFilterService.buildOrderBy(filters.sortBy, filters.sortDir);
        return this.loadTableData(where, orderBy, filters.page, filters.pageSize, query.draw ?? 0);
    }
    async buildExportPayload(user, query, selectedClientId) {
        const { filters: parsedFilters, range } = this.reportFilterService.buildFilters(user, query);
        const filters = {
            ...parsedFilters,
            clientId: selectedClientId ?? parsedFilters.clientId,
        };
        const where = this.reportFilterService.buildWhereClause(user, filters, range);
        const [summary, rows] = await Promise.all([
            this.loadSummary(where),
            this.loadAllRows(where, filters.sortBy, filters.sortDir),
        ]);
        return {
            filters,
            range,
            summary,
            rows: rows.map((row) => this.toRow(row)),
        };
    }
    async loadSummary(where) {
        const [aggregation, clients, tasks] = await Promise.all([
            this.prisma.timeEntry.aggregate({
                where,
                _sum: {
                    durationSeconds: true,
                },
                _count: {
                    id: true,
                },
            }),
            this.prisma.timeEntry.groupBy({
                by: ['clientId'],
                where,
            }),
            this.prisma.timeEntry.groupBy({
                by: ['taskId'],
                where,
            }),
        ]);
        return {
            totalHours: Number(((aggregation._sum.durationSeconds ?? 0) / 3600).toFixed(2)),
            totalTimeEntries: aggregation._count.id,
            activeClients: clients.length,
            activeTasks: tasks.length,
        };
    }
    async loadCharts(where, range) {
        const [rows, clientGroups, taskGroups] = await Promise.all([
            this.prisma.timeEntry.findMany({
                where,
                select: {
                    startTime: true,
                    durationSeconds: true,
                    client: {
                        select: {
                            name: true,
                        },
                    },
                    task: {
                        select: {
                            title: true,
                        },
                    },
                },
            }),
            this.prisma.timeEntry.groupBy({
                by: ['clientId'],
                where,
                _sum: {
                    durationSeconds: true,
                },
            }),
            this.prisma.timeEntry.groupBy({
                by: ['taskId'],
                where,
                _sum: {
                    durationSeconds: true,
                },
            }),
        ]);
        const dayBuckets = new Map();
        const weekBuckets = new Map();
        for (const entry of rows) {
            const dayKey = this.formatDateBucket(entry.startTime);
            const weekKey = this.formatWeekBucket(entry.startTime);
            dayBuckets.set(dayKey, (dayBuckets.get(dayKey) ?? 0) + entry.durationSeconds);
            weekBuckets.set(weekKey, (weekBuckets.get(weekKey) ?? 0) + entry.durationSeconds);
        }
        const clientLabels = new Map();
        const taskLabels = new Map();
        const clientRecords = await this.prisma.client.findMany({
            where: {
                id: {
                    in: clientGroups.map((group) => group.clientId),
                },
            },
            select: {
                id: true,
                name: true,
            },
        });
        const taskRecords = await this.prisma.task.findMany({
            where: {
                id: {
                    in: taskGroups.map((group) => group.taskId),
                },
            },
            select: {
                id: true,
                title: true,
            },
        });
        clientRecords.forEach((client) => clientLabels.set(client.id, client.name));
        taskRecords.forEach((task) => taskLabels.set(task.id, task.title));
        const hoursPerDay = [...dayBuckets.entries()]
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([label, seconds]) => ({ label, value: Number((seconds / 3600).toFixed(2)) }));
        const hoursPerWeek = [...weekBuckets.entries()]
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([label, seconds]) => ({ label, value: Number((seconds / 3600).toFixed(2)) }));
        const hoursPerClient = clientGroups
            .map((group) => ({
            label: clientLabels.get(group.clientId) ?? `Client #${group.clientId}`,
            value: Number(((group._sum.durationSeconds ?? 0) / 3600).toFixed(2)),
        }))
            .sort((left, right) => right.value - left.value);
        const hoursPerTask = taskGroups
            .map((group) => ({
            label: taskLabels.get(group.taskId) ?? `Task #${group.taskId}`,
            value: Number(((group._sum.durationSeconds ?? 0) / 3600).toFixed(2)),
        }))
            .sort((left, right) => right.value - left.value);
        return {
            hoursPerDay: hoursPerDay.length > 0 ? hoursPerDay : [{ label: this.formatDateBucket(range.from), value: 0 }],
            hoursPerWeek: hoursPerWeek.length > 0 ? hoursPerWeek : [{ label: this.formatWeekBucket(range.from), value: 0 }],
            hoursPerClient,
            hoursPerTask,
        };
    }
    async loadOptions(user, where) {
        const [clients, tasks, users] = await Promise.all([
            this.prisma.client.findMany({
                where: where.client?.userId !== undefined
                    ? {
                        userId: where.client.userId,
                        archivedAt: null,
                    }
                    : {
                        archivedAt: null,
                    },
                select: {
                    id: true,
                    name: true,
                },
                orderBy: { name: 'asc' },
            }),
            this.prisma.task.findMany({
                where: where.client?.userId !== undefined
                    ? {
                        client: {
                            userId: where.client.userId,
                        },
                    }
                    : {},
                select: {
                    id: true,
                    title: true,
                },
                orderBy: { title: 'asc' },
            }),
            this.prisma.user.findMany({
                where: {
                    ...(where.client?.userId !== undefined
                        ? {
                            timeEntries: {
                                some: {
                                    client: {
                                        userId: where.client.userId,
                                    },
                                },
                            },
                        }
                        : {}),
                },
                select: {
                    id: true,
                    name: true,
                },
                orderBy: { name: 'asc' },
            }),
        ]);
        return {
            clients: clients.map((client) => ({ id: client.id, label: client.name })),
            tasks: tasks.map((task) => ({ id: task.id, label: task.title })),
            teamMembers: users.map((item) => ({ id: item.id, label: item.name })),
        };
    }
    async loadTableData(where, orderBy, page, pageSize, draw) {
        const [count, rows] = await Promise.all([
            this.prisma.timeEntry.count({
                where,
            }),
            this.prisma.timeEntry.findMany({
                where,
                select: this.reportSelect,
                orderBy,
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
        ]);
        return {
            rows: rows.map((row) => this.toRow(row)),
            totalRows: count,
            filteredRows: count,
            page,
            pageSize,
            draw,
        };
    }
    async loadAllRows(where, sortBy, sortDir) {
        return this.prisma.timeEntry.findMany({
            where,
            select: this.reportSelect,
            orderBy: this.reportFilterService.buildOrderBy(sortBy, sortDir),
        });
    }
    toRow(entry) {
        const durationSeconds = entry.durationSeconds;
        return {
            id: entry.id,
            date: this.formatDateCell(entry.startTime),
            client: entry.client.name,
            task: entry.task.title,
            teamMember: entry.user.name,
            startTime: this.formatTimeCell(entry.startTime),
            endTime: entry.endTime ? this.formatTimeCell(entry.endTime) : null,
            duration: this.formatDuration(durationSeconds),
            durationSeconds,
            description: this.normalizeDescription(entry.description),
            entryType: entry.isManual ? 'Manual' : 'Timer',
            status: entry.status,
            billable: entry.client.billable,
        };
    }
    formatDateCell(value) {
        return new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(value);
    }
    formatTimeCell(value) {
        return new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit',
        }).format(value);
    }
    formatDuration(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [hours, minutes, seconds]
            .map((value) => String(value).padStart(2, '0'))
            .join(':');
    }
    normalizeDescription(description) {
        if (!description) {
            return '';
        }
        return description.trim();
    }
    formatDateBucket(value) {
        return new Intl.DateTimeFormat('en-CA').format(value);
    }
    formatWeekBucket(value) {
        const date = new Date(value);
        const offset = (date.getDay() + 6) % 7;
        date.setDate(date.getDate() - offset);
        return new Intl.DateTimeFormat('en-CA').format(date);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        report_filter_service_1.ReportFilterService])
], ReportsService);
