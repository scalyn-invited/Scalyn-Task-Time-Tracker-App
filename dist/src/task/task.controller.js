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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const bulk_task_ids_dto_1 = require("./dto/bulk-task-ids.dto");
const bulk_update_tasks_dto_1 = require("./dto/bulk-update-tasks.dto");
const create_task_dto_1 = require("./dto/create-task.dto");
const list_tasks_query_dto_1 = require("./dto/list-tasks.query.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    async findAll(req, query) {
        return this.taskService.list(req.user, query);
    }
    async findOne(req, id) {
        return this.taskService.getOwnedTaskById(req.user, id);
    }
    async findTimeLogs(req, id) {
        return this.taskService.listTimeLogs(req.user, id);
    }
    async create(req, dto) {
        return this.taskService.create(req.user, dto);
    }
    async bulkUpdate(req, dto) {
        return this.taskService.bulkUpdate(req.user, dto);
    }
    async update(req, id, dto) {
        return this.taskService.update(req.user, id, dto);
    }
    async bulkRemove(req, dto) {
        return this.taskService.bulkRemove(req.user, dto.taskIds);
    }
    async remove(req, id) {
        return this.taskService.remove(req.user, id);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_tasks_query_dto_1.ListTasksQueryDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/time-logs'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findTimeLogs", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('bulk'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_update_tasks_dto_1.BulkUpdateTasksDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "bulkUpdate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_task_ids_dto_1.BulkTaskIdsDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "bulkRemove", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
