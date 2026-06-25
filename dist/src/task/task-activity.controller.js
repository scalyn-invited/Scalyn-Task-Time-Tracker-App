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
exports.TaskActivityController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const task_activity_service_1 = require("./task-activity.service");
const task_service_1 = require("./task.service");
let TaskActivityController = class TaskActivityController {
    taskService;
    taskActivityService;
    constructor(taskService, taskActivityService) {
        this.taskService = taskService;
        this.taskActivityService = taskActivityService;
    }
    async list(req, id) {
        await this.taskService.getOwnedTaskById(req.user, id);
        return this.taskActivityService.listByTask(id);
    }
};
exports.TaskActivityController = TaskActivityController;
__decorate([
    (0, common_1.Get)(':id/activity'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskActivityController.prototype, "list", null);
exports.TaskActivityController = TaskActivityController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        task_activity_service_1.TaskActivityService])
], TaskActivityController);
