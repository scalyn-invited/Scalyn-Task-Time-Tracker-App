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
exports.TimesheetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
let TimesheetService = class TimesheetService {
    prisma;
    timeEntrySelect = {
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
        task: {
            select: {
                id: true,
                title: true,
            },
        },
        client: {
            select: {
                id: true,
                name: true,
            },
        },
        user: {
            select: {
                id: true,
                name: true,
                email: true,
            },
        },
    };
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(user, query) {
        const view = query.view ?? 'weekly';
        const range = this.resolveRange(view, query.from, query.to);
        const where = this.buildWhereClause(user.id, query, range.from, range.to);
        const [aggregation, entries] = await Promise.all([
            this.prisma.timeEntry.aggregate({
                where,
                _sum: {
                    durationSeconds: true,
                },
                _count: {
                    id: true,
                },
            }),
            this.prisma.timeEntry.findMany({
                where,
                select: this.timeEntrySelect,
                orderBy: [
                    {
                        startTime: 'desc',
                    },
                    {
                        id: 'desc',
                    },
                ],
            }),
        ]);
        const normalizedEntries = entries.map((entry) => this.toEntryResponse(entry));
        const groups = this.groupEntriesByDate(normalizedEntries);
        return {
            view,
            range: {
                from: range.from.toISOString(),
                to: range.to.toISOString(),
                label: this.describeRange(range.from, range.to),
            },
            totals: {
                durationSeconds: aggregation._sum.durationSeconds ?? 0,
                entryCount: aggregation._count.id,
            },
            groups,
        };
    }
    async update(user, id, dto) {
        const current = await this.findOwnedEntryOrFail(user.id, id);
        const nextClientId = dto.clientId ?? current.clientId;
        const nextTaskId = dto.taskId ?? current.taskId;
        await this.findOwnedTaskAndClientOrFail(user.id, nextClientId, nextTaskId);
        const startTime = dto.startTime !== undefined ? this.parseDateTime(dto.startTime, 'startTime') : current.startTime;
        const endTime = dto.endTime !== undefined ? this.parseDateTime(dto.endTime, 'endTime') : current.endTime;
        if (endTime && endTime.getTime() < startTime.getTime()) {
            throw new common_1.BadRequestException('endTime must be later than startTime');
        }
        const data = {
            client: {
                connect: {
                    id: nextClientId,
                },
            },
            task: {
                connect: {
                    id: nextTaskId,
                },
            },
            startTime,
            endTime,
            durationSeconds: this.calculateDurationSeconds(startTime, endTime ?? startTime, current.totalPausedSeconds),
        };
        if (dto.description !== undefined) {
            data.description = this.normalizeDescription(dto.description);
        }
        const updated = await this.prisma.timeEntry.update({
            where: {
                id: current.id,
            },
            data,
            select: this.timeEntrySelect,
        });
        return this.toEntryResponse(updated);
    }
    async remove(user, id) {
        const entry = await this.findOwnedEntryOrFail(user.id, id);
        const deleted = await this.prisma.timeEntry.delete({
            where: {
                id: entry.id,
            },
            select: this.timeEntrySelect,
        });
        return this.toEntryResponse(deleted);
    }
    async bulkUpdate(user, dto) {
        if (!dto.changes || (dto.changes.clientId === undefined && dto.changes.taskId === undefined)) {
            throw new common_1.BadRequestException('At least one change must be provided');
        }
        const entries = await this.prisma.timeEntry.findMany({
            where: {
                id: { in: dto.timeEntryIds },
                status: prisma_client_1.TimeEntryStatus.COMPLETED,
                client: { userId: user.id },
            },
            select: this.timeEntrySelect,
        });
        if (entries.length !== dto.timeEntryIds.length) {
            throw new common_1.NotFoundException('One or more time entries were not found');
        }
        for (const entry of entries) {
            const nextClientId = dto.changes.clientId ?? entry.clientId;
            const nextTaskId = dto.changes.taskId ?? entry.taskId;
            await this.findOwnedTaskAndClientOrFail(user.id, nextClientId, nextTaskId);
            await this.prisma.timeEntry.update({
                where: { id: entry.id },
                data: {
                    client: { connect: { id: nextClientId } },
                    task: { connect: { id: nextTaskId } },
                },
            });
        }
        return { count: dto.timeEntryIds.length };
    }
    async bulkRemove(user, timeEntryIds) {
        const entries = await this.prisma.timeEntry.findMany({
            where: {
                id: { in: timeEntryIds },
                status: prisma_client_1.TimeEntryStatus.COMPLETED,
                client: { userId: user.id },
            },
            select: { id: true },
        });
        if (entries.length !== timeEntryIds.length) {
            throw new common_1.NotFoundException('One or more time entries were not found');
        }
        await this.prisma.timeEntry.deleteMany({
            where: { id: { in: timeEntryIds } },
        });
        return { count: timeEntryIds.length };
    }
    buildWhereClause(userId, query, from, to) {
        const where = {
            status: prisma_client_1.TimeEntryStatus.COMPLETED,
            client: {
                userId,
            },
            startTime: {
                gte: from,
                lte: to,
            },
        };
        if (query.userId !== undefined) {
            where.userId = query.userId;
        }
        if (query.clientId !== undefined) {
            where.clientId = query.clientId;
        }
        if (query.taskId !== undefined) {
            where.taskId = query.taskId;
        }
        return where;
    }
    groupEntriesByDate(entries) {
        const groups = new Map();
        for (const entry of entries) {
            const dateKey = this.getDateKey(entry.startTime);
            const existing = groups.get(dateKey);
            const duration = entry.durationSeconds;
            if (existing) {
                existing.totalDurationSeconds += duration;
                existing.entryCount += 1;
                existing.entries.push(entry);
                continue;
            }
            groups.set(dateKey, {
                date: dateKey,
                label: this.formatDateLabel(entry.startTime),
                totalDurationSeconds: duration,
                entryCount: 1,
                entries: [entry],
            });
        }
        return [...groups.values()].sort((left, right) => right.date.localeCompare(left.date));
    }
    toEntryResponse(entry) {
        return {
            ...entry,
            status: 'COMPLETED',
            task: entry.task,
            client: entry.client,
            user: entry.user,
        };
    }
    async findOwnedEntryOrFail(userId, id) {
        const entry = await this.prisma.timeEntry.findFirst({
            where: {
                id,
                status: prisma_client_1.TimeEntryStatus.COMPLETED,
                client: {
                    userId,
                },
            },
            select: this.timeEntrySelect,
        });
        if (!entry) {
            throw new common_1.NotFoundException('Time entry not found');
        }
        return entry;
    }
    async findOwnedTaskAndClientOrFail(userId, clientId, taskId) {
        const client = await this.prisma.client.findFirst({
            where: {
                id: clientId,
                userId,
            },
            select: {
                id: true,
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        const task = await this.prisma.task.findFirst({
            where: {
                id: taskId,
                clientId,
                client: {
                    userId,
                },
            },
            select: {
                id: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found for the selected client');
        }
    }
    resolveRange(view, from, to) {
        if (from || to) {
            const start = from ? this.parseDateOnly(from, false) : this.getDefaultRange(view).from;
            const end = to ? this.parseDateOnly(to, true) : this.getDefaultRange(view).to;
            if (end.getTime() < start.getTime()) {
                throw new common_1.BadRequestException('to must be later than or equal to from');
            }
            return { from: start, to: end };
        }
        return this.getDefaultRange(view);
    }
    getDefaultRange(view) {
        const now = new Date();
        if (view === 'daily') {
            return {
                from: this.startOfDay(now),
                to: this.endOfDay(now),
            };
        }
        if (view === 'monthly') {
            const from = new Date(now.getFullYear(), now.getMonth(), 1);
            const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            return {
                from: this.startOfDay(from),
                to: this.endOfDay(to),
            };
        }
        const start = this.startOfWeek(now);
        const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
        return {
            from: this.startOfDay(start),
            to: this.endOfDay(end),
        };
    }
    startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }
    endOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }
    startOfWeek(date) {
        const current = this.startOfDay(date);
        const offset = (current.getDay() + 6) % 7;
        current.setDate(current.getDate() - offset);
        return current;
    }
    parseDateOnly(value, endOfDay) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            throw new common_1.BadRequestException('Date filters must be in YYYY-MM-DD format');
        }
        const [year, month, day] = value.split('-').map((segment) => Number(segment));
        const date = new Date(year, month - 1, day, endOfDay ? 23 : 0, endOfDay ? 59 : 0, endOfDay ? 59 : 0, endOfDay ? 999 : 0);
        if (Number.isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Date filters must be valid dates');
        }
        return date;
    }
    parseDateTime(value, fieldName) {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            throw new common_1.BadRequestException(`${fieldName} must be a valid ISO date/time`);
        }
        return parsed;
    }
    calculateDurationSeconds(startTime, endTime, totalPausedSeconds) {
        const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000) - totalPausedSeconds;
        if (duration < 0) {
            throw new common_1.BadRequestException('Calculated duration cannot be negative');
        }
        return duration;
    }
    normalizeDescription(description) {
        if (description === undefined) {
            return undefined;
        }
        const normalized = description.trim();
        return normalized.length > 0 ? normalized : null;
    }
    formatDateLabel(date) {
        return new Intl.DateTimeFormat(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    }
    describeRange(from, to) {
        const formatter = new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
        return `${formatter.format(from)} - ${formatter.format(to)}`;
    }
    getDateKey(date) {
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
};
exports.TimesheetService = TimesheetService;
exports.TimesheetService = TimesheetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimesheetService);
