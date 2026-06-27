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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientService = class ClientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const data = this.normalizePayload({
            name: dto.name,
            description: dto.description,
            monthlyAllowanceMinutes: dto.monthlyAllowanceMinutes,
            billable: dto.billable,
        });
        return this.prisma.client.create({
            data: {
                ...data,
                userId,
                archivedAt: null,
            },
        });
    }
    async listActive(userId) {
        return this.prisma.client.findMany({
            where: {
                userId,
                archivedAt: null,
            },
            orderBy: [{ name: 'asc' }, { updatedAt: 'desc' }],
        });
    }
    async listArchived(userId) {
        return this.prisma.client.findMany({
            where: {
                userId,
                archivedAt: { not: null },
            },
            orderBy: [{ archivedAt: 'desc' }, { name: 'asc' }],
        });
    }
    async findOne(userId, clientId) {
        return this.findOwnedClientOrFail(userId, clientId);
    }
    async findAll(userId) {
        return this.listActive(userId);
    }
    async update(userId, clientId, dto) {
        const client = await this.findOwnedClientOrFail(userId, clientId);
        const data = this.normalizeUpdatePayload(dto);
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('At least one field must be provided');
        }
        return this.prisma.client.update({
            where: { id: client.id },
            data,
        });
    }
    async archive(userId, clientId) {
        const client = await this.findOwnedClientOrFail(userId, clientId);
        return this.prisma.client.update({
            where: { id: client.id },
            data: {
                archivedAt: new Date(),
            },
        });
    }
    async restore(userId, clientId) {
        const client = await this.findOwnedClientOrFail(userId, clientId);
        return this.prisma.client.update({
            where: { id: client.id },
            data: {
                archivedAt: null,
            },
        });
    }
    async remove(userId, clientId) {
        return this.archive(userId, clientId);
    }
    async bulkArchive(userId, clientIds) {
        const clients = await this.prisma.client.findMany({
            where: {
                id: { in: clientIds },
                userId,
            },
            select: { id: true },
        });
        if (clients.length !== clientIds.length) {
            throw new common_1.NotFoundException('One or more clients were not found');
        }
        await this.prisma.client.updateMany({
            where: { id: { in: clientIds } },
            data: { archivedAt: new Date() },
        });
        return { count: clientIds.length };
    }
    async bulkRestore(userId, clientIds) {
        const clients = await this.prisma.client.findMany({
            where: {
                id: { in: clientIds },
                userId,
            },
            select: { id: true },
        });
        if (clients.length !== clientIds.length) {
            throw new common_1.NotFoundException('One or more clients were not found');
        }
        await this.prisma.client.updateMany({
            where: { id: { in: clientIds } },
            data: { archivedAt: null },
        });
        return { count: clientIds.length };
    }
    async findOwnedClientOrFail(userId, clientId) {
        const client = await this.prisma.client.findFirst({
            where: {
                id: clientId,
                userId,
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        return client;
    }
    normalizeUpdatePayload(dto) {
        const data = {};
        if (dto.name !== undefined) {
            data.name = this.normalizeName(dto.name);
        }
        if (dto.description !== undefined) {
            data.description = this.normalizeDescription(dto.description);
        }
        if (dto.monthlyAllowanceMinutes !== undefined) {
            data.monthlyAllowanceMinutes = this.normalizeAllowance(dto.monthlyAllowanceMinutes);
        }
        if (dto.billable !== undefined) {
            data.billable = dto.billable;
        }
        return data;
    }
    normalizePayload(input) {
        return {
            name: this.normalizeName(input.name),
            description: this.normalizeDescription(input.description),
            monthlyAllowanceMinutes: this.normalizeAllowance(input.monthlyAllowanceMinutes),
            billable: input.billable,
        };
    }
    normalizeName(name) {
        const normalizedName = name.trim();
        if (normalizedName.length < 2 || normalizedName.length > 120) {
            throw new common_1.BadRequestException('Client name must be between 2 and 120 characters');
        }
        return normalizedName;
    }
    normalizeDescription(description) {
        if (description === undefined) {
            return null;
        }
        const normalizedDescription = description.trim();
        return normalizedDescription.length > 0 ? normalizedDescription : null;
    }
    normalizeAllowance(value) {
        if (!Number.isInteger(value) || value < 0) {
            throw new common_1.BadRequestException('Monthly allowance must be a non-negative whole number of minutes');
        }
        return value;
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
