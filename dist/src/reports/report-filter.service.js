"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportFilterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const DEFAULT_PAGE_SIZE = 10;
let ReportFilterService = class ReportFilterService {
    buildFilters(user, query) {
        const scope = this.resolveScope(user);
        const page = query.page ?? 1;
        const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;
        const preset = query.preset ?? 'thisMonth';
        const range = this.resolveRange(preset, query.from, query.to);
        const filters = {
            preset,
            from: query.from,
            to: query.to,
            clientId: query.clientId,
            taskId: query.taskId,
            userId: query.userId,
            entryType: query.entryType ?? 'all',
            status: query.status ?? 'all',
            billable: query.billable ?? 'all',
            search: this.normalizeSearch(query.search),
            page,
            pageSize,
            sortBy: query.sortBy ?? 'date',
            sortDir: query.sortDir ?? 'desc',
        };
        if (!scope.canSeeWorkspaceData) {
            return {
                filters,
                range,
                scope,
            };
        }
        return {
            filters,
            range,
            scope,
        };
    }
    buildWhereClause(user, filters, range) {
        const where = {
            startTime: {
                gte: range.from,
                lte: range.to,
            },
        };
        if (!this.resolveScope(user).canSeeWorkspaceData) {
            where.client = {
                userId: user.id,
            };
        }
        if (filters.clientId !== undefined) {
            where.clientId = filters.clientId;
        }
        if (filters.taskId !== undefined) {
            where.taskId = filters.taskId;
        }
        if (filters.userId !== undefined) {
            where.userId = filters.userId;
        }
        if (filters.entryType === 'timer') {
            where.isManual = false;
        }
        else if (filters.entryType === 'manual') {
            where.isManual = true;
        }
        if (filters.status && filters.status !== 'all') {
            where.status = filters.status;
        }
        if (filters.billable !== 'all') {
            const existingAnd = Array.isArray(where.AND)
                ? where.AND
                : where.AND
                    ? [where.AND]
                    : [];
            where.AND = [
                ...existingAnd,
                {
                    client: {
                        billable: filters.billable === 'true',
                    },
                },
            ];
        }
        if (filters.search) {
            where.OR = [
                {
                    description: {
                        contains: filters.search,
                    },
                },
                {
                    client: {
                        name: {
                            contains: filters.search,
                        },
                    },
                },
                {
                    task: {
                        title: {
                            contains: filters.search,
                        },
                    },
                },
                {
                    user: {
                        name: {
                            contains: filters.search,
                        },
                    },
                },
                {
                    user: {
                        email: {
                            contains: filters.search,
                        },
                    },
                },
            ];
        }
        return where;
    }
    buildOrderBy(sortBy, sortDir) {
        const direction = sortDir;
        switch (sortBy) {
            case 'client':
                return [{ client: { name: direction } }, { id: direction }];
            case 'task':
                return [{ task: { title: direction } }, { id: direction }];
            case 'teamMember':
                return [{ user: { name: direction } }, { id: direction }];
            case 'startTime':
            case 'date':
                return [{ startTime: direction }, { id: direction }];
            case 'endTime':
                return [{ endTime: direction }, { id: direction }];
            case 'duration':
                return [{ durationSeconds: direction }, { id: direction }];
            case 'description':
                return [{ description: direction }, { id: direction }];
            case 'entryType':
                return [{ isManual: direction }, { id: direction }];
            default:
                return [{ startTime: 'desc' }, { id: 'desc' }];
        }
    }
    resolveRange(preset, from, to) {
        if (preset === 'custom') {
            if (!from || !to) {
                throw new common_1.BadRequestException('Custom date range requires both from and to values');
            }
            const bounds = this.parseExplicitRange(from, to);
            return {
                from: bounds.from,
                to: bounds.to,
                label: this.describeRange(bounds.from, bounds.to),
            };
        }
        const bounds = this.getPresetRange(preset);
        return {
            from: bounds.from,
            to: bounds.to,
            label: this.describeRange(bounds.from, bounds.to),
        };
    }
    getDateSqlRange(range) {
        return {
            from: range.from.toISOString(),
            to: range.to.toISOString(),
            label: range.label,
        };
    }
    resolveScope(user) {
        return {
            canSeeWorkspaceData: user.role === prisma_client_1.UserRole.ADMIN || user.role === prisma_client_1.UserRole.MANAGER,
        };
    }
    normalizeSearch(value) {
        const normalized = value?.trim().replace(/\s+/g, ' ');
        return normalized && normalized.length > 0 ? normalized : '';
    }
    parseExplicitRange(from, to) {
        const start = this.parseDateOnly(from, false);
        const end = this.parseDateOnly(to, true);
        if (end.getTime() < start.getTime()) {
            throw new common_1.BadRequestException('to must be later than or equal to from');
        }
        return { from: start, to: end };
    }
    getPresetRange(preset) {
        const now = new Date();
        const today = this.startOfDay(now);
        switch (preset) {
            case 'today':
                return { from: today, to: this.endOfDay(now) };
            case 'yesterday': {
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                return { from: yesterday, to: this.endOfDay(yesterday) };
            }
            case 'lastWeek': {
                const currentWeekStart = this.startOfWeek(now);
                const from = new Date(currentWeekStart);
                from.setDate(from.getDate() - 7);
                const to = new Date(currentWeekStart);
                to.setDate(to.getDate() - 1);
                return { from, to: this.endOfDay(to) };
            }
            case 'thisWeek': {
                const from = this.startOfWeek(now);
                return { from, to: this.endOfDay(now) };
            }
            case 'lastMonth': {
                const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const to = new Date(now.getFullYear(), now.getMonth(), 0);
                return { from: this.startOfDay(from), to: this.endOfDay(to) };
            }
            case 'thisYear': {
                const from = new Date(now.getFullYear(), 0, 1);
                return { from: this.startOfDay(from), to: this.endOfDay(now) };
            }
            case 'thisMonth':
            default: {
                const from = new Date(now.getFullYear(), now.getMonth(), 1);
                return { from: this.startOfDay(from), to: this.endOfDay(now) };
            }
        }
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
    describeRange(from, to) {
        const formatter = new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
        return `${formatter.format(from)} - ${formatter.format(to)}`;
    }
};
exports.ReportFilterService = ReportFilterService;
exports.ReportFilterService = ReportFilterService = __decorate([
    (0, common_1.Injectable)()
], ReportFilterService);
