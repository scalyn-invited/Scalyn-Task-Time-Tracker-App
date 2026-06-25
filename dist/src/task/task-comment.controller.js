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
exports.CommentController = exports.TaskCommentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_task_comment_dto_1 = require("./dto/create-task-comment.dto");
const update_task_comment_dto_1 = require("./dto/update-task-comment.dto");
const task_comment_service_1 = require("./task-comment.service");
let TaskCommentController = class TaskCommentController {
    taskCommentService;
    constructor(taskCommentService) {
        this.taskCommentService = taskCommentService;
    }
    async findAll(req, id) {
        return this.taskCommentService.list(req.user, id);
    }
    async create(req, id, dto) {
        return this.taskCommentService.create(req.user, id, dto);
    }
};
exports.TaskCommentController = TaskCommentController;
__decorate([
    (0, common_1.Get)(':id/comments'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskCommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_task_comment_dto_1.CreateTaskCommentDto]),
    __metadata("design:returntype", Promise)
], TaskCommentController.prototype, "create", null);
exports.TaskCommentController = TaskCommentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/tasks'),
    __metadata("design:paramtypes", [task_comment_service_1.TaskCommentService])
], TaskCommentController);
let CommentController = class CommentController {
    taskCommentService;
    constructor(taskCommentService) {
        this.taskCommentService = taskCommentService;
    }
    async update(req, id, dto) {
        return this.taskCommentService.update(req.user, id, dto);
    }
    async remove(req, id) {
        return this.taskCommentService.remove(req.user, id);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_task_comment_dto_1.UpdateTaskCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/comments'),
    __metadata("design:paramtypes", [task_comment_service_1.TaskCommentService])
], CommentController);
