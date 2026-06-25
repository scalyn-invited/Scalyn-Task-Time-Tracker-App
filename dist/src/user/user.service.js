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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCurrentUser(userId) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.toSafeUser(user);
    }
    async updateProfile(userId, dto) {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const data = {};
        if (dto.name !== undefined) {
            data.name = dto.name.trim();
        }
        if (dto.email !== undefined) {
            data.email = dto.email.trim().toLowerCase();
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('At least one field must be provided');
        }
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id: userId },
                data,
            });
            return this.toSafeUser(updatedUser);
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new common_1.ConflictException('Email is already registered');
            }
            throw error;
        }
    }
    async listUsers() {
        const users = await this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return users;
    }
    async findUserById(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
    toSafeUser(user) {
        const { password: _password, ...safeUser } = user;
        void _password;
        return safeUser;
    }
    isUniqueConstraintError(error) {
        return (typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === 'P2002');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
