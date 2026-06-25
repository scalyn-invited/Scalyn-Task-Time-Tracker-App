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
exports.TaskLabelController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_task_label_dto_1 = require("./dto/create-task-label.dto");
const task_label_service_1 = require("./task-label.service");
let TaskLabelController = class TaskLabelController {
    taskLabelService;
    constructor(taskLabelService) {
        this.taskLabelService = taskLabelService;
    }
    async findAll(req) {
        return this.taskLabelService.list(req.user);
    }
    async create(req, dto) {
        return this.taskLabelService.create(req.user, dto);
    }
    async remove(req, id) {
        return this.taskLabelService.remove(req.user, id);
    }
};
exports.TaskLabelController = TaskLabelController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskLabelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_task_label_dto_1.CreateTaskLabelDto]),
    __metadata("design:returntype", Promise)
], TaskLabelController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskLabelController.prototype, "remove", null);
exports.TaskLabelController = TaskLabelController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/task-labels'),
    __metadata("design:paramtypes", [task_label_service_1.TaskLabelService])
], TaskLabelController);
