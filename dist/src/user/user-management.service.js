"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_client_1 = require("../prisma/prisma-client");
let UserManagementService = class UserManagementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCurrentUser(userId) {
        const user = await this.findUserOrFail(userId);
        return this.toSafeUser(user);
    }
    async updateProfile(userId, dto) {
        const user = await this.findUserOrFail(userId);
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
        const updated = await this.updateUserRecord(user.id, data);
        return this.toSafeUser(updated);
    }
    async changePassword(userId, dto) {
        if (dto.newPassword !== dto.confirmPassword) {
            throw new common_1.BadRequestException('Password confirmation does not match');
        }
        const user = await this.findUserOrFail(userId);
        const matches = await bcrypt.compare(dto.currentPassword, user.password);
        if (!matches) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const password = await this.hashPassword(dto.newPassword);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password },
        });
    }
    async listUsers(currentUser) {
        const users = currentUser.systemRole === 'admin'
            ? await this.prisma.user.findMany({
                orderBy: [{ createdAt: 'desc' }],
            })
            : await this.prisma.user.findMany({
                where: {
                    teamMemberships: {
                        some: {
                            team: {
                                members: {
                                    some: {
                                        userId: currentUser.id,
                                        role: prisma_client_1.UserRole.MANAGER,
                                    },
                                },
                            },
                        },
                    },
                },
                orderBy: [{ createdAt: 'desc' }],
            });
        return users.map((user) => this.toSafeUser(user));
    }
    async getUser(currentUser, userId) {
        const user = await this.findAccessibleUser(currentUser, userId);
        return this.toSafeUser(user);
    }
    async createUser(currentUser, dto) {
        this.ensureAdmin(currentUser);
        if (dto.temporaryPassword !== dto.confirmPassword) {
            throw new common_1.BadRequestException('Password confirmation does not match');
        }
        const email = dto.email.trim().toLowerCase();
        const password = await this.hashPassword(dto.temporaryPassword);
        const systemRole = this.toStoredRole(dto.systemRole);
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email is already registered');
        }
        const user = await this.prisma.$transaction(async (transaction) => {
            const created = await transaction.user.create({
                data: {
                    name: dto.name.trim(),
                    email,
                    password,
                    systemRole,
                    isActive: true,
                },
            });
            if (dto.assignToTeam && dto.teamId && dto.teamRole) {
                await transaction.teamMember.create({
                    data: {
                        teamId: dto.teamId,
                        userId: created.id,
                        role: this.toStoredRole(dto.teamRole),
                    },
                });
            }
            else if (dto.assignToTeam && dto.teamId) {
                await transaction.teamMember.create({
                    data: {
                        teamId: dto.teamId,
                        userId: created.id,
                        role: prisma_client_1.UserRole.MEMBER,
                    },
                });
            }
            return created;
        });
        return this.toSafeUser(user);
    }
    async updateUser(currentUser, userId, dto) {
        this.ensureAdmin(currentUser);
        if (userId === currentUser.id && dto.systemRole && this.toSystemRole(dto.systemRole) !== currentUser.systemRole) {
            throw new common_1.ForbiddenException('You cannot change your own system role');
        }
        const user = await this.findUserOrFail(userId);
        const data = {};
        if (dto.name !== undefined) {
            data.name = dto.name.trim();
        }
        if (dto.email !== undefined) {
            data.email = dto.email.trim().toLowerCase();
        }
        if (dto.systemRole !== undefined) {
            data.systemRole = this.toStoredRole(dto.systemRole);
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('At least one field must be provided');
        }
        const updated = await this.updateUserRecord(user.id, data);
        return this.toSafeUser(updated);
    }
    async updateStatus(currentUser, userId, dto) {
        this.ensureAdmin(currentUser);
        if (userId === currentUser.id && dto.isActive === false) {
            throw new common_1.ForbiddenException('You cannot deactivate your own account');
        }
        const user = await this.findUserOrFail(userId);
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: { isActive: dto.isActive },
        });
        return this.toSafeUser(updated);
    }
    async deleteUser(currentUser, userId) {
        this.ensureAdmin(currentUser);
        if (userId === currentUser.id) {
            throw new common_1.ForbiddenException('You cannot delete your own account');
        }
        const user = await this.findUserOrFail(userId);
        try {
            await this.prisma.user.delete({
                where: { id: user.id },
            });
        }
        catch (_error) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { isActive: false },
            });
        }
        return {
            ...this.toSafeUser(user),
            isActive: false,
        };
    }
    async findAccessibleUser(currentUser, userId) {
        const user = await this.findUserOrFail(userId);
        if (currentUser.systemRole === 'admin') {
            return user;
        }
        if (currentUser.id === user.id) {
            return user;
        }
        const allowed = await this.prisma.teamMember.findFirst({
            where: {
                userId: currentUser.id,
                role: prisma_client_1.UserRole.MANAGER,
                team: {
                    members: {
                        some: {
                            userId: user.id,
                        },
                    },
                },
            },
        });
        if (!allowed) {
            throw new common_1.ForbiddenException('You cannot access this user');
        }
        return user;
    }
    async findUserOrFail(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateUserRecord(userId, data) {
        try {
            return (await this.prisma.user.update({
                where: { id: userId },
                data,
            }));
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new common_1.ConflictException('Email is already registered');
            }
            throw error;
        }
    }
    ensureAdmin(user) {
        if (user.systemRole !== 'admin') {
            throw new common_1.ForbiddenException('Admin access required');
        }
    }
    toSafeUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            systemRole: this.toSystemRole(user.systemRole),
            role: user.systemRole,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    toStoredRole(role) {
        return role.toUpperCase();
    }
    toSystemRole(role) {
        return role.toLowerCase();
    }
    async hashPassword(password) {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }
    isUniqueConstraintError(error) {
        return (typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === 'P2002');
    }
};
exports.UserManagementService = UserManagementService;
exports.UserManagementService = UserManagementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserManagementService);
