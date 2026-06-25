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
exports.TaskCommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const task_html_1 = require("./task-html");
const task_service_1 = require("./task.service");
const task_activity_service_1 = require("./task-activity.service");
let TaskCommentService = class TaskCommentService {
    prisma;
    taskService;
    taskActivityService;
    constructor(prisma, taskService, taskActivityService) {
        this.prisma = prisma;
        this.taskService = taskService;
        this.taskActivityService = taskActivityService;
    }
    async list(user, taskId) {
        await this.taskService.getOwnedTaskById(user, taskId);
        return this.prisma.taskComment.findMany({
            where: { taskId },
            include: { user: true },
            orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        });
    }
    async create(user, taskId, dto) {
        const task = await this.taskService.getOwnedTaskById(user, taskId);
        const content = (0, task_html_1.sanitizeTaskHtml)(dto.content);
        const parentId = dto.parentId ?? null;
        let parent = null;
        if (parentId !== null) {
            parent = await this.prisma.taskComment.findFirst({
                where: {
                    id: parentId,
                    taskId: task.id,
                },
            });
            if (!parent) {
                throw new common_1.NotFoundException('Parent comment not found');
            }
            const depth = await this.getCommentDepth(parent.id);
            if (depth >= 3) {
                throw new common_1.BadRequestException('Comment threads are limited to 3 levels');
            }
        }
        const comment = await this.prisma.taskComment.create({
            data: {
                taskId: task.id,
                userId: user.id,
                parentId,
                content,
                editedAt: null,
            },
            include: { user: true },
        });
        await this.taskActivityService.record({
            taskId: task.id,
            userId: user.id,
            action: parent ? 'COMMENT_REPLIED' : 'COMMENT_ADDED',
            entityType: 'comment',
            entityId: comment.id,
            metadata: {
                parentId,
            },
        });
        return comment;
    }
    async update(user, commentId, dto) {
        const existing = await this.findOwnedCommentOrFail(user.id, commentId);
        const content = (0, task_html_1.sanitizeTaskHtml)(dto.content);
        const updated = await this.prisma.taskComment.update({
            where: { id: existing.id },
            data: {
                content,
                editedAt: new Date(),
            },
            include: { user: true },
        });
        await this.taskActivityService.record({
            taskId: updated.taskId,
            userId: user.id,
            action: 'COMMENT_EDITED',
            entityType: 'comment',
            entityId: updated.id,
        });
        return updated;
    }
    async remove(user, commentId) {
        const existing = await this.findOwnedCommentOrFail(user.id, commentId);
        const deleted = await this.prisma.taskComment.delete({
            where: { id: existing.id },
        });
        await this.taskActivityService.record({
            taskId: deleted.taskId,
            userId: user.id,
            action: 'COMMENT_DELETED',
            entityType: 'comment',
            entityId: deleted.id,
            metadata: {
                parentId: deleted.parentId,
            },
        });
        return deleted;
    }
    async findOwnedCommentOrFail(userId, commentId) {
        const comment = await this.prisma.taskComment.findFirst({
            where: {
                id: commentId,
                userId,
            },
            include: { user: true },
        });
        if (!comment) {
            throw new common_1.ForbiddenException('Comment not found or not owned by you');
        }
        return comment;
    }
    async getCommentDepth(commentId) {
        let depth = 1;
        let current = await this.prisma.taskComment.findUnique({
            where: { id: commentId },
            select: { parentId: true },
        });
        while (current?.parentId) {
            depth += 1;
            current = await this.prisma.taskComment.findUnique({
                where: { id: current.parentId },
                select: { parentId: true },
            });
        }
        return depth;
    }
};
exports.TaskCommentService = TaskCommentService;
exports.TaskCommentService = TaskCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        task_service_1.TaskService,
        task_activity_service_1.TaskActivityService])
], TaskCommentService);
