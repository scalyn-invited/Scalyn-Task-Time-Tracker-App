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
exports.TaskLabelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../prisma/prisma-client");
const prisma_service_1 = require("../prisma/prisma.service");
let TaskLabelService = class TaskLabelService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(_user) {
        const labels = await this.prisma.taskLabel.findMany({
            orderBy: [{ name: 'asc' }],
        });
        return labels.map((label) => ({
            ...label,
            name: this.normalizeName(label.name),
        }));
    }
    async create(user, dto) {
        this.ensureLabelManager(user.role);
        const name = this.normalizeName(dto.name);
        return this.prisma.taskLabel.upsert({
            where: {
                name,
            },
            update: {},
            create: {
                name,
            },
        });
    }
    async remove(user, labelId) {
        this.ensureLabelManager(user.role);
        const label = await this.findLabelOrFail(labelId);
        return this.prisma.taskLabel.delete({
            where: {
                id: label.id,
            },
        });
    }
    async findLabelOrFail(labelId) {
        const label = await this.prisma.taskLabel.findUnique({
            where: {
                id: labelId,
            },
        });
        if (!label) {
            throw new common_1.NotFoundException('Label not found');
        }
        return label;
    }
    ensureLabelManager(role) {
        if (role !== prisma_client_1.UserRole.ADMIN && role !== prisma_client_1.UserRole.MANAGER) {
            throw new common_1.ForbiddenException('You do not have permission to manage labels');
        }
    }
    normalizeName(name) {
        const normalizedName = String(name || '').trim().replace(/\s+/g, ' ');
        if (normalizedName.length < 1 || normalizedName.length > 80) {
            throw new common_1.BadRequestException('Label name must be between 1 and 80 characters');
        }
        return normalizedName;
    }
};
exports.TaskLabelService = TaskLabelService;
exports.TaskLabelService = TaskLabelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskLabelService);
