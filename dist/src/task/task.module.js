"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const prisma_module_1 = require("../prisma/prisma.module");
const task_activity_controller_1 = require("./task-activity.controller");
const task_attachment_controller_1 = require("./task-attachment.controller");
const task_comment_controller_1 = require("./task-comment.controller");
const task_label_controller_1 = require("./task-label.controller");
const task_label_service_1 = require("./task-label.service");
const task_controller_1 = require("./task.controller");
const task_activity_service_1 = require("./task-activity.service");
const task_attachment_service_1 = require("./task-attachment.service");
const task_comment_service_1 = require("./task-comment.service");
const task_service_1 = require("./task.service");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule],
        controllers: [
            task_controller_1.TaskController,
            task_label_controller_1.TaskLabelController,
            task_attachment_controller_1.TaskAttachmentController,
            task_comment_controller_1.TaskCommentController,
            task_comment_controller_1.CommentController,
            task_activity_controller_1.TaskActivityController,
        ],
        providers: [
            task_service_1.TaskService,
            task_label_service_1.TaskLabelService,
            task_activity_service_1.TaskActivityService,
            task_attachment_service_1.TaskAttachmentService,
            task_comment_service_1.TaskCommentService,
        ],
        exports: [task_service_1.TaskService, task_label_service_1.TaskLabelService, task_activity_service_1.TaskActivityService, task_attachment_service_1.TaskAttachmentService, task_comment_service_1.TaskCommentService],
    })
], TaskModule);
