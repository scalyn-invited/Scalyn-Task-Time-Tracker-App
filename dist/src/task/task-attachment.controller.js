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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAttachmentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const crypto_1 = require("crypto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const task_attachment_service_1 = require("./task-attachment.service");
const task_upload_1 = require("./task-upload");
let TaskAttachmentController = class TaskAttachmentController {
    taskAttachmentService;
    constructor(taskAttachmentService) {
        this.taskAttachmentService = taskAttachmentService;
    }
    async list(req, id) {
        return this.taskAttachmentService.list(req.user, id);
    }
    async upload(req, id, files = []) {
        return this.taskAttachmentService.create(req.user, id, files);
    }
    async stream(req, id, attachmentId, download, res) {
        const attachment = await this.taskAttachmentService.findOwnedAttachmentOrFail(req.user, id, attachmentId);
        res.setHeader('Content-Disposition', `${download === '1' ? 'attachment' : 'inline'}; filename="${encodeURIComponent(attachment.originalName)}"`);
        res.setHeader('Content-Type', attachment.mimeType);
        res.sendFile(attachment.filePath);
    }
    async remove(req, id, attachmentId) {
        return this.taskAttachmentService.remove(req.user, id, attachmentId);
    }
};
exports.TaskAttachmentController = TaskAttachmentController;
__decorate([
    (0, common_1.Get)(':id/attachments'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskAttachmentController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':id/attachments'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, callback) => {
                try {
                    callback(null, (0, task_upload_1.ensureTaskUploadRoot)());
                }
                catch (error) {
                    callback(error, '');
                }
            },
            filename: (_req, file, callback) => {
                const safeName = file.originalname
                    .replace(/[^\w.\-]+/g, '_')
                    .replace(/_+/g, '_')
                    .slice(0, 80);
                const extension = (0, task_upload_1.getTaskAttachmentExtension)(file.originalname) || (0, path_1.extname)(safeName);
                callback(null, `${Date.now()}-${(0, crypto_1.randomUUID)()}${extension}`);
            },
        }),
        limits: {
            fileSize: task_upload_1.MAX_TASK_ATTACHMENT_SIZE,
        },
        fileFilter: (_req, file, callback) => {
            if (!task_upload_1.ALLOWED_TASK_ATTACHMENT_MIME_TYPES.has(file.mimetype)) {
                callback(new common_1.BadRequestException(`Unsupported file type: ${file.mimetype}`), false);
                return;
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Array]),
    __metadata("design:returntype", Promise)
], TaskAttachmentController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(':id/attachments/:attachmentId/file'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('attachmentId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('download')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskAttachmentController.prototype, "stream", null);
__decorate([
    (0, common_1.Delete)(':id/attachments/:attachmentId'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('attachmentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], TaskAttachmentController.prototype, "remove", null);
exports.TaskAttachmentController = TaskAttachmentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/tasks'),
    __metadata("design:paramtypes", [task_attachment_service_1.TaskAttachmentService])
], TaskAttachmentController);
