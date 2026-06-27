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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
const task_html_1 = require("./task-html");
const task_activity_service_1 = require("./task-activity.service");
let TaskService = class TaskService {
    prisma;
    taskActivityService;
    constructor(prisma, taskActivityService) {
        this.prisma = prisma;
        this.taskActivityService = taskActivityService;
    }
    async list(user, query) {
        const where = {
            client: {
                userId: user.id,
            },
        };
        if (query.clientId !== undefined) {
            where.clientId = query.clientId;
        }
        if (query.userId !== undefined) {
            where.userId = query.userId;
        }
        const tasks = await this.prisma.task.findMany({
            where,
            include: {
                client: true,
                user: true,
                labels: true,
            },
            orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
        });
        return tasks.map((task) => ({
            ...task,
            labels: [...task.labels].sort((left, right) => left.name.localeCompare(right.name)),
        }));
    }
    async create(user, dto) {
        const title = this.normalizeTitle(dto.title);
        const client = await this.findOwnedClientOrFail(user.id, dto.clientId);
        const assignee = await this.findUserOrFail(dto.userId);
        const priority = dto.priority ?? prisma_client_1.TaskPriority.MEDIUM;
        const status = dto.status ?? prisma_client_1.TaskStatus.OPEN;
        const descriptionHtml = (0, task_html_1.sanitizeTaskHtml)(dto.descriptionHtml);
        const labels = await this.resolveLabels(dto.labels ?? []);
        const task = await this.prisma.task.create({
            data: {
                title,
                descriptionHtml: descriptionHtml || null,
                priority,
                status,
                client: {
                    connect: {
                        id: client.id,
                    },
                },
                user: {
                    connect: {
                        id: assignee.id,
                    },
                },
                labels: labels.length > 0
                    ? {
                        connect: labels.map((label) => ({ id: label.id })),
                    }
                    : undefined,
            },
            include: {
                client: true,
                user: true,
                labels: true,
            },
        });
        await this.taskActivityService.record({
            taskId: task.id,
            userId: user.id,
            action: 'TASK_CREATED',
            entityType: 'task',
            entityId: task.id,
            metadata: {
                title: task.title,
                clientId: task.clientId,
                userId: task.userId,
            },
        });
        return this.sortTaskLabels(task);
    }
    async update(user, taskId, dto) {
        const existingTask = await this.findOwnedTaskOrFail(user.id, taskId);
        const nextUserId = dto.userId ?? existingTask.userId;
        const assignee = nextUserId === existingTask.userId
            ? existingTask.user
            : await this.findUserOrFail(nextUserId);
        const data = {};
        if (dto.title !== undefined) {
            data.title = this.normalizeTitle(dto.title);
        }
        if (dto.descriptionHtml !== undefined) {
            data.descriptionHtml = (0, task_html_1.sanitizeTaskHtml)(dto.descriptionHtml) || null;
        }
        if (dto.priority !== undefined) {
            data.priority = dto.priority;
        }
        if (dto.status !== undefined) {
            data.status = dto.status;
        }
        if (dto.clientId !== undefined) {
            const client = dto.clientId === existingTask.clientId
                ? existingTask.client
                : await this.findOwnedClientOrFail(user.id, dto.clientId);
            data.client = {
                connect: {
                    id: client.id,
                },
            };
        }
        if (dto.userId !== undefined) {
            data.user = {
                connect: {
                    id: assignee.id,
                },
            };
        }
        if (dto.labels !== undefined) {
            const labels = await this.resolveLabels(dto.labels);
            data.labels = {
                set: labels.map((label) => ({ id: label.id })),
            };
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('At least one field must be provided');
        }
        const task = await this.prisma.task.update({
            where: { id: existingTask.id },
            data,
            include: {
                client: true,
                user: true,
                labels: true,
            },
        });
        const activityUpdates = await this.getUpdateActivityEvents(user.id, existingTask, task, dto);
        await Promise.all(activityUpdates.map((entry) => this.taskActivityService.record(entry)));
        return this.sortTaskLabels(task);
    }
    async remove(user, taskId) {
        await this.findOwnedTaskOrFail(user.id, taskId);
        return this.prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    }
    async bulkUpdate(user, dto) {
        if (!dto.changes || (dto.changes.priority === undefined && dto.changes.status === undefined)) {
            throw new common_1.BadRequestException('At least one change must be provided');
        }
        const tasks = await this.prisma.task.findMany({
            where: {
                id: { in: dto.taskIds },
                client: { userId: user.id },
            },
            include: {
                client: true,
                user: true,
                labels: true,
            },
        });
        if (tasks.length !== dto.taskIds.length) {
            throw new common_1.NotFoundException('One or more tasks were not found');
        }
        await this.prisma.task.updateMany({
            where: {
                id: { in: dto.taskIds },
            },
            data: {
                ...(dto.changes.priority !== undefined ? { priority: dto.changes.priority } : {}),
                ...(dto.changes.status !== undefined ? { status: dto.changes.status } : {}),
            },
        });
        return { count: dto.taskIds.length };
    }
    async bulkRemove(user, taskIds) {
        const tasks = await this.prisma.task.findMany({
            where: {
                id: { in: taskIds },
                client: { userId: user.id },
            },
            select: { id: true },
        });
        if (tasks.length !== taskIds.length) {
            throw new common_1.NotFoundException('One or more tasks were not found');
        }
        await this.prisma.task.deleteMany({
            where: {
                id: { in: taskIds },
            },
        });
        return { count: taskIds.length };
    }
    async getOwnedTaskById(user, taskId) {
        return this.findOwnedTaskOrFail(user.id, taskId);
    }
    async listAllLabels() {
        return this.prisma.taskLabel.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async findOwnedClientOrFail(userId, clientId) {
        const client = await this.prisma.client.findFirst({
            where: {
                id: clientId,
                userId,
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        return client;
    }
    async findUserOrFail(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Assigned user not found');
        }
        return user;
    }
    async findOwnedTaskOrFail(userId, taskId) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: taskId,
                client: {
                    userId,
                },
            },
            include: {
                client: true,
                user: true,
                labels: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return task;
    }
    async getUpdateActivityEvents(actorUserId, before, after, dto) {
        const events = [];
        const statusChanged = dto.status !== undefined && before.status !== after.status;
        const descriptionChanged = dto.descriptionHtml !== undefined && before.descriptionHtml !== after.descriptionHtml;
        const assigneeChanged = dto.userId !== undefined && before.userId !== after.userId;
        const genericUpdated = dto.title !== undefined ||
            dto.priority !== undefined ||
            dto.clientId !== undefined ||
            dto.labels !== undefined;
        if (statusChanged) {
            events.push({
                taskId: after.id,
                userId: actorUserId,
                action: 'TASK_STATUS_CHANGED',
                entityType: 'task',
                entityId: after.id,
                metadata: { previous: before.status, next: after.status },
            });
        }
        if (descriptionChanged) {
            events.push({
                taskId: after.id,
                userId: actorUserId,
                action: 'TASK_DESCRIPTION_UPDATED',
                entityType: 'task',
                entityId: after.id,
                metadata: {
                    previousLength: before.descriptionHtml?.length || 0,
                    nextLength: after.descriptionHtml?.length || 0,
                },
            });
        }
        if (assigneeChanged) {
            events.push({
                taskId: after.id,
                userId: actorUserId,
                action: 'TASK_ASSIGNED',
                entityType: 'user',
                entityId: after.userId,
                metadata: { previousUserId: before.userId, nextUserId: after.userId },
            });
        }
        if (genericUpdated) {
            events.push({
                taskId: after.id,
                userId: actorUserId,
                action: 'TASK_UPDATED',
                entityType: 'task',
                entityId: after.id,
                metadata: {
                    previousTitle: before.title,
                    nextTitle: after.title,
                    previousClientId: before.clientId,
                    nextClientId: after.clientId,
                    previousPriority: before.priority,
                    nextPriority: after.priority,
                },
            });
        }
        return events;
    }
    async resolveLabels(labels) {
        const normalizedLabels = this.normalizeLabels(labels);
        if (normalizedLabels.length === 0) {
            return [];
        }
        const existingLabels = await this.prisma.taskLabel.findMany({
            where: {
                name: {
                    in: normalizedLabels,
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
        if (existingLabels.length !== normalizedLabels.length) {
            throw new common_1.BadRequestException('One or more labels do not exist');
        }
        return existingLabels;
    }
    normalizeTitle(title) {
        const normalizedTitle = title.trim().replace(/\s+/g, ' ');
        if (normalizedTitle.length < 2 || normalizedTitle.length > 191) {
            throw new common_1.BadRequestException('Task title must be between 2 and 191 characters');
        }
        return normalizedTitle;
    }
    normalizeLabels(labels) {
        const normalized = labels
            .map((label) => this.normalizeLabel(label))
            .filter((label) => label.length > 0);
        return [...new Set(normalized)];
    }
    normalizeLabel(label) {
        if (typeof label !== 'string') {
            throw new common_1.BadRequestException('Label must be a string');
        }
        const normalizedLabel = label.trim().replace(/\s+/g, ' ');
        if (normalizedLabel.length === 0 || normalizedLabel.length > 80) {
            throw new common_1.BadRequestException('Labels must be between 1 and 80 characters');
        }
        return normalizedLabel;
    }
    sortTaskLabels(task) {
        return {
            ...task,
            labels: [...task.labels].sort((left, right) => left.name.localeCompare(right.name)),
        };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        task_activity_service_1.TaskActivityService])
], TaskService);
