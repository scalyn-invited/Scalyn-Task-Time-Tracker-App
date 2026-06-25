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
exports.TaskActivityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TaskActivityService = class TaskActivityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async record(params) {
        return this.prisma.taskActivity.create({
            data: {
                taskId: params.taskId,
                userId: params.userId,
                action: params.action,
                entityType: params.entityType,
                entityId: params.entityId ?? null,
                metadata: (params.metadata ?? undefined),
            },
        });
    }
    async listByTask(taskId) {
        return this.prisma.taskActivity.findMany({
            where: { taskId },
            include: {
                user: true,
                task: true,
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        });
    }
};
exports.TaskActivityService = TaskActivityService;
exports.TaskActivityService = TaskActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskActivityService);
