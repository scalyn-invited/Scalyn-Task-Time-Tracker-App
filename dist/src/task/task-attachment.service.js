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
exports.TaskAttachmentService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const prisma_service_1 = require("../prisma/prisma.service");
const task_service_1 = require("./task.service");
const task_activity_service_1 = require("./task-activity.service");
const task_upload_1 = require("./task-upload");
let TaskAttachmentService = class TaskAttachmentService {
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
        const attachments = await this.prisma.taskAttachment.findMany({
            where: { taskId },
            include: { uploadedByUser: true },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        });
        return attachments.map((attachment) => ({
            ...attachment,
            filePath: String(attachment.filePath),
        }));
    }
    async create(user, taskId, files) {
        const task = await this.taskService.getOwnedTaskById(user, taskId);
        (0, task_upload_1.ensureTaskUploadRoot)();
        if (files.length === 0) {
            return this.list(user, taskId);
        }
        for (const file of files) {
            await this.prisma.taskAttachment.create({
                data: {
                    taskId: task.id,
                    uploadedBy: user.id,
                    fileName: file.filename,
                    originalName: file.originalname,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                    filePath: file.path,
                },
            });
            await this.taskActivityService.record({
                taskId: task.id,
                userId: user.id,
                action: 'ATTACHMENT_UPLOADED',
                entityType: 'attachment',
                metadata: {
                    fileName: file.filename,
                    originalName: file.originalname,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                },
            });
        }
        return this.list(user, taskId);
    }
    async remove(user, taskId, attachmentId) {
        const task = await this.taskService.getOwnedTaskById(user, taskId);
        const attachment = await this.prisma.taskAttachment.findFirst({
            where: {
                id: attachmentId,
                taskId: task.id,
            },
        });
        if (!attachment) {
            throw new common_1.NotFoundException('Attachment not found');
        }
        if ((0, fs_1.existsSync)(attachment.filePath)) {
            (0, fs_1.unlinkSync)(attachment.filePath);
        }
        const deleted = await this.prisma.taskAttachment.delete({
            where: { id: attachment.id },
        });
        await this.taskActivityService.record({
            taskId: task.id,
            userId: user.id,
            action: 'ATTACHMENT_DELETED',
            entityType: 'attachment',
            entityId: deleted.id,
            metadata: {
                originalName: deleted.originalName,
                fileName: deleted.fileName,
            },
        });
        return deleted;
    }
    async findOwnedAttachmentOrFail(user, taskId, attachmentId) {
        await this.taskService.getOwnedTaskById(user, taskId);
        const attachment = await this.prisma.taskAttachment.findFirst({
            where: {
                id: attachmentId,
                taskId,
            },
            include: {
                uploadedByUser: true,
            },
        });
        if (!attachment) {
            throw new common_1.NotFoundException('Attachment not found');
        }
        return attachment;
    }
    getAttachmentPath(fileName) {
        return (0, task_upload_1.buildTaskAttachmentPath)(fileName);
    }
};
exports.TaskAttachmentService = TaskAttachmentService;
exports.TaskAttachmentService = TaskAttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        task_service_1.TaskService,
        task_activity_service_1.TaskActivityService])
], TaskAttachmentService);
