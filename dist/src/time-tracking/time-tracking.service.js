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
                endTime: null,
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
            const { client, task } = await this.findOwnedTaskAndClientOrFail(tx, userId, dto.clientId, dto.taskId);
            await this.closeActiveTimers(tx, userId, startedAt);
            const entry = await tx.timeEntry.create({
                data: {
                    userId,
                    taskId: task.id,
                    clientId: client.id,
                    startTime: startedAt,
                    endTime: null,
                    durationSeconds: 0,
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
    async stopTimer(userId, dto) {
        const stoppedAt = new Date();
        const description = this.normalizeDescription(dto.description);
        return this.prisma.$transaction(async (tx) => {
            const activeEntries = await tx.timeEntry.findMany({
                where: {
                    userId,
                    endTime: null,
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
            if (activeEntries.length === 0) {
                throw new common_1.NotFoundException('No active timer found');
            }
            for (const activeEntry of activeEntries) {
                await this.closeEntry(tx, activeEntry, stoppedAt, description);
            }
            const stoppedEntry = activeEntries[0];
            const completed = await tx.timeEntry.findUnique({
                where: { id: stoppedEntry.id },
                include: this.timeEntryInclude,
            });
            if (!completed) {
                throw new common_1.NotFoundException('Active timer not found');
            }
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
    async closeActiveTimers(tx, userId, endedAt) {
        const activeEntries = await tx.timeEntry.findMany({
            where: {
                userId,
                endTime: null,
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
        for (const activeEntry of activeEntries) {
            await this.closeEntry(tx, activeEntry, endedAt);
        }
    }
    async closeEntry(tx, entry, endedAt, description) {
        const durationSeconds = this.calculateDurationSeconds(entry.startTime, endedAt);
        await tx.timeEntry.update({
            where: {
                id: entry.id,
            },
            data: {
                endTime: endedAt,
                durationSeconds,
                ...(description !== undefined ? { description } : {}),
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
        const isRunning = entry.endTime === null;
        return {
            ...entry,
            elapsedSeconds: isRunning
                ? this.calculateDurationSeconds(entry.startTime, now)
                : entry.durationSeconds,
            isRunning,
        };
    }
};
exports.TimeTrackingService = TimeTrackingService;
exports.TimeTrackingService = TimeTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeTrackingService);
