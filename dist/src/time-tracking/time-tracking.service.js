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
exports.TimeTrackingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
let TimeTrackingService = class TimeTrackingService {
    prisma;
    timeEntryInclude = {
        task: {
            include: {
                client: true,
            },
        },
        client: true,
    };
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getActiveTimer(userId) {
        const activeEntry = await this.prisma.timeEntry.findFirst({
            where: {
                userId,
                status: {
                    in: [prisma_client_1.TimeEntryStatus.RUNNING, prisma_client_1.TimeEntryStatus.PAUSED],
                },
            },
            include: this.timeEntryInclude,
            orderBy: [
                {
                    startTime: 'desc',
                },
                {
                    id: 'desc',
                },
            ],
        });
        if (!activeEntry) {
            return null;
        }
        return this.formatResponse(activeEntry, new Date());
    }
    async startTimer(userId, dto) {
        const description = this.normalizeDescription(dto.description);
        const startedAt = new Date();
        return this.prisma.$transaction(async (tx) => {
            await this.assertNoActiveTimer(tx, userId);
            const { client, task } = await this.findOwnedTaskAndClientOrFail(tx, userId, dto.clientId, dto.taskId);
            const entry = await tx.timeEntry.create({
                data: {
                    userId,
                    taskId: task.id,
                    clientId: client.id,
                    startTime: startedAt,
                    endTime: null,
                    durationSeconds: 0,
                    totalPausedSeconds: 0,
                    pausedAt: null,
                    status: prisma_client_1.TimeEntryStatus.RUNNING,
                    description,
                    isManual: false,
                },
                include: this.timeEntryInclude,
            });
            return this.formatResponse(entry, startedAt);
        }, {
            isolationLevel: prisma_client_1.Prisma.TransactionIsolationLevel.Serializable,
        });
    }
    async pauseTimer(userId) {
        const pausedAt = new Date();
        return this.prisma.$transaction(async (tx) => {
            const activeEntry = await this.findActiveTimerOrFail(tx, userId, prisma_client_1.TimeEntryStatus.RUNNING);
            const updated = await tx.timeEntry.update({
                where: {
                    id: activeEntry.id,
                },
                data: {
                    pausedAt,
                    status: prisma_client_1.TimeEntryStatus.PAUSED,
                },
                include: this.timeEntryInclude,
            });
            await this.recordTimerActivity(tx, updated, 'TIMER_PAUSED', {
                pausedAt: pausedAt.toISOString(),
                totalPausedSeconds: updated.totalPausedSeconds,
            });
            return this.formatResponse(updated, pausedAt);
        }, {
            isolationLevel: prisma_client_1.Prisma.TransactionIsolationLevel.Serializable,
        });
    }
    async resumeTimer(userId) {
        const resumedAt = new Date();
        return this.prisma.$transaction(async (tx) => {
            const activeEntry = await this.findActiveTimerOrFail(tx, userId, prisma_client_1.TimeEntryStatus.PAUSED);
            if (!activeEntry.pausedAt) {
                throw new common_1.BadRequestException('Paused timer is missing a pause timestamp');
            }
            const pauseDurationSeconds = this.calculateDurationSeconds(activeEntry.pausedAt, resumedAt);
            const updated = await tx.timeEntry.update({
                where: {
                    id: activeEntry.id,
                },
                data: {
                    pausedAt: null,
                    totalPausedSeconds: activeEntry.totalPausedSeconds + pauseDurationSeconds,
                    status: prisma_client_1.TimeEntryStatus.RUNNING,
                },
                include: this.timeEntryInclude,
            });
            await this.recordTimerActivity(tx, updated, 'TIMER_RESUMED', {
                resumedAt: resumedAt.toISOString(),
                pauseDurationSeconds,
                totalPausedSeconds: updated.totalPausedSeconds,
            });
            return this.formatResponse(updated, resumedAt);
        }, {
            isolationLevel: prisma_client_1.Prisma.TransactionIsolationLevel.Serializable,
        });
    }
    async stopTimer(userId, dto) {
        const stoppedAt = new Date();
        const description = this.normalizeDescription(dto.description);
        return this.prisma.$transaction(async (tx) => {
            const activeEntry = await this.findActiveTimerOrFail(tx, userId, [
                prisma_client_1.TimeEntryStatus.RUNNING,
                prisma_client_1.TimeEntryStatus.PAUSED,
            ]);
            const completed = await this.completeTimerEntry(tx, activeEntry, stoppedAt, description);
            await this.recordTimerActivity(tx, completed, 'TIMER_STOPPED', {
                stoppedAt: stoppedAt.toISOString(),
                totalPausedSeconds: completed.totalPausedSeconds,
                durationSeconds: completed.durationSeconds,
            });
            return this.formatResponse(completed, stoppedAt);
        }, {
            isolationLevel: prisma_client_1.Prisma.TransactionIsolationLevel.Serializable,
        });
    }
    async createManualEntry(userId, dto) {
        const description = this.normalizeDescription(dto.description);
        const endedAt = new Date();
        const durationSeconds = this.calculateDurationSecondsFromMinutes(dto.durationMinutes);
        const startTime = new Date(endedAt.getTime() - durationSeconds * 1000);
        return this.prisma.$transaction(async (tx) => {
            const { client, task } = await this.findOwnedTaskAndClientOrFail(tx, userId, dto.clientId, dto.taskId);
            const entry = await tx.timeEntry.create({
                data: {
                    userId,
                    taskId: task.id,
                    clientId: client.id,
                    startTime,
                    endTime: endedAt,
                    durationSeconds,
                    totalPausedSeconds: 0,
                    pausedAt: null,
                    status: prisma_client_1.TimeEntryStatus.COMPLETED,
                    description,
                    isManual: true,
                },
                include: this.timeEntryInclude,
            });
            return this.formatResponse(entry, endedAt);
        }, {
            isolationLevel: prisma_client_1.Prisma.TransactionIsolationLevel.Serializable,
        });
    }
    async assertNoActiveTimer(tx, userId) {
        const activeTimer = await tx.timeEntry.findFirst({
            where: {
                userId,
                status: {
                    in: [prisma_client_1.TimeEntryStatus.RUNNING, prisma_client_1.TimeEntryStatus.PAUSED],
                },
            },
            select: {
                id: true,
            },
            orderBy: [
                {
                    startTime: 'desc',
                },
                {
                    id: 'desc',
                },
            ],
        });
        if (activeTimer) {
            throw new common_1.BadRequestException('An active timer already exists. Pause or stop it before starting a new one.');
        }
    }
    async findActiveTimerOrFail(tx, userId, status) {
        const statuses = Array.isArray(status) ? status : [status];
        const entry = await tx.timeEntry.findFirst({
            where: {
                userId,
                status: {
                    in: statuses,
                },
            },
            include: this.timeEntryInclude,
            orderBy: [
                {
                    startTime: 'desc',
                },
                {
                    id: 'desc',
                },
            ],
        });
        if (!entry) {
            const stateLabel = statuses.length === 1 ? this.toTimerStateLabel(statuses[0]) : 'active';
            throw new common_1.BadRequestException(`No ${stateLabel} timer found`);
        }
        return entry;
    }
    async completeTimerEntry(tx, entry, stoppedAt, description) {
        if (entry.status === prisma_client_1.TimeEntryStatus.PAUSED && !entry.pausedAt) {
            throw new common_1.BadRequestException('Paused timer is missing a pause timestamp');
        }
        const pauseDurationSeconds = entry.status === prisma_client_1.TimeEntryStatus.PAUSED && entry.pausedAt
            ? this.calculateDurationSeconds(entry.pausedAt, stoppedAt)
            : 0;
        const totalPausedSeconds = entry.totalPausedSeconds + pauseDurationSeconds;
        const durationSeconds = this.calculateDurationSeconds(entry.startTime, stoppedAt) - totalPausedSeconds;
        if (durationSeconds < 0) {
            throw new common_1.BadRequestException('Calculated duration cannot be negative');
        }
        return tx.timeEntry.update({
            where: {
                id: entry.id,
            },
            data: {
                endTime: stoppedAt,
                durationSeconds,
                totalPausedSeconds,
                pausedAt: null,
                status: prisma_client_1.TimeEntryStatus.COMPLETED,
                ...(description !== undefined ? { description } : {}),
            },
            include: this.timeEntryInclude,
        });
    }
    async recordTimerActivity(tx, entry, action, metadata) {
        await tx.taskActivity.create({
            data: {
                taskId: entry.taskId,
                userId: entry.userId,
                action,
                entityType: 'time_entry',
                entityId: entry.id,
                metadata: {
                    ...metadata,
                    timerStatus: this.toApiTimerStatus(entry.status),
                    taskTitle: entry.task.title,
                    clientId: entry.clientId,
                },
            },
        });
    }
    async findOwnedTaskAndClientOrFail(tx, userId, clientId, taskId) {
        const client = await tx.client.findFirst({
            where: {
                id: clientId,
                userId,
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        const task = await tx.task.findFirst({
            where: {
                id: taskId,
                clientId: client.id,
                client: {
                    userId,
                },
            },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found for the selected client');
        }
        return { client, task };
    }
    parseDate(value, fieldName) {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            throw new common_1.BadRequestException(`${fieldName} must be a valid ISO date`);
        }
        return parsed;
    }
    calculateDurationSecondsFromMinutes(durationMinutes) {
        if (!Number.isInteger(durationMinutes) || durationMinutes < 1) {
            throw new common_1.BadRequestException('durationMinutes must be a positive whole number');
        }
        return durationMinutes * 60;
    }
    calculateDurationSeconds(startTime, endTime) {
        const duration = endTime.getTime() - startTime.getTime();
        if (duration < 0) {
            throw new common_1.BadRequestException('endTime must be later than startTime');
        }
        return Math.floor(duration / 1000);
    }
    normalizeDescription(description) {
        if (description === undefined) {
            return undefined;
        }
        const normalized = description.trim();
        return normalized.length > 0 ? normalized : null;
    }
    formatResponse(entry, now) {
        const status = this.toApiTimerStatus(entry.status);
        const elapsedSeconds = this.calculateElapsedSeconds(entry, now);
        return {
            ...entry,
            status,
            elapsedSeconds,
            isRunning: status === 'running',
            isPaused: status === 'paused',
        };
    }
    calculateElapsedSeconds(entry, now) {
        const endReference = entry.status === prisma_client_1.TimeEntryStatus.PAUSED
            ? entry.pausedAt ?? now
            : entry.endTime ?? now;
        const duration = this.calculateDurationSeconds(entry.startTime, endReference) - entry.totalPausedSeconds;
        return Math.max(0, duration);
    }
    toApiTimerStatus(status) {
        switch (status) {
            case prisma_client_1.TimeEntryStatus.RUNNING:
                return 'running';
            case prisma_client_1.TimeEntryStatus.PAUSED:
                return 'paused';
            case prisma_client_1.TimeEntryStatus.COMPLETED:
                return 'completed';
            default:
                return 'completed';
        }
    }
    toTimerStateLabel(status) {
        switch (status) {
            case prisma_client_1.TimeEntryStatus.RUNNING:
                return 'running';
            case prisma_client_1.TimeEntryStatus.PAUSED:
                return 'paused';
            case prisma_client_1.TimeEntryStatus.COMPLETED:
                return 'completed';
            default:
                return 'active';
        }
    }
};
exports.TimeTrackingService = TimeTrackingService;
exports.TimeTrackingService = TimeTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeTrackingService);
