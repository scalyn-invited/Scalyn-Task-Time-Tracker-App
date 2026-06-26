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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_client_1 = require("../prisma/prisma-client");
let TeamService = class TeamService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listTeams(currentUser) {
        const teams = await this.prisma.team.findMany({
            where: currentUser.systemRole === 'admin'
                ? undefined
                : {
                    members: {
                        some: {
                            userId: currentUser.id,
                            role: prisma_client_1.UserRole.MANAGER,
                        },
                    },
                },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                systemRole: true,
                                isActive: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        members: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return teams.map((team) => this.toTeamSummary(team));
    }
    async getTeam(currentUser, teamId) {
        const team = await this.findAccessibleTeam(currentUser, teamId);
        return this.toTeamSummary(team);
    }
    async createTeam(currentUser, dto) {
        this.ensureAdmin(currentUser);
        const name = dto.name.trim();
        const existing = await this.prisma.team.findFirst({ where: { name } });
        if (existing) {
            throw new common_1.ConflictException('Team name already exists');
        }
        const team = await this.prisma.team.create({
            data: {
                name,
                description: dto.description?.trim() || null,
                createdById: currentUser.id,
            },
            include: {
                members: true,
                _count: { select: { members: true } },
            },
        });
        return this.toTeamSummary(team);
    }
    async updateTeam(currentUser, teamId, dto) {
        const team = await this.findManageableTeam(currentUser, teamId);
        const data = {};
        if (dto.name !== undefined) {
            data.name = dto.name.trim();
        }
        if (dto.description !== undefined) {
            data.description = dto.description?.trim() || null;
        }
        if (Object.keys(data).length === 0) {
            throw new common_1.BadRequestException('At least one field must be provided');
        }
        const updated = await this.prisma.team.update({
            where: { id: team.id },
            data,
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                systemRole: true,
                                isActive: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                _count: { select: { members: true } },
            },
        });
        return this.toTeamSummary(updated);
    }
    async deleteTeam(currentUser, teamId) {
        const team = await this.findManageableTeam(currentUser, teamId);
        await this.prisma.team.delete({
            where: { id: team.id },
        });
    }
    async listMembers(currentUser, teamId) {
        const team = await this.findAccessibleTeam(currentUser, teamId);
        const members = await this.prisma.teamMember.findMany({
            where: { teamId: team.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        systemRole: true,
                        isActive: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
            orderBy: [{ joinedAt: 'desc' }],
        });
        return members.map((member) => this.toMemberSummary(member));
    }
    async addMember(currentUser, teamId, dto) {
        const team = await this.findManageableTeam(currentUser, teamId);
        const targetUser = await this.prisma.user.findUnique({
            where: { id: dto.userId },
        });
        if (!targetUser) {
            throw new common_1.NotFoundException('User not found');
        }
        if (targetUser.id === currentUser.id && currentUser.systemRole !== 'admin') {
            throw new common_1.ForbiddenException('You cannot add yourself to a team');
        }
        if (currentUser.systemRole !== 'admin') {
            this.ensureManagerAssignableRole(currentUser, dto.role);
        }
        try {
            const member = await this.prisma.teamMember.create({
                data: {
                    teamId: team.id,
                    userId: targetUser.id,
                    role: this.toStoredRole(dto.role),
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            systemRole: true,
                            isActive: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
            return this.toMemberSummary(member);
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new common_1.ConflictException('User is already a member of this team');
            }
            throw error;
        }
    }
    async updateMember(currentUser, teamId, memberId, dto) {
        const team = await this.findManageableTeam(currentUser, teamId);
        const member = await this.prisma.teamMember.findUnique({
            where: { id: memberId },
            include: { user: true },
        });
        if (!member || member.teamId !== team.id) {
            throw new common_1.NotFoundException('Team member not found');
        }
        if (member.userId === currentUser.id && currentUser.systemRole !== 'admin') {
            throw new common_1.ForbiddenException('You cannot change your own team role');
        }
        if (currentUser.systemRole !== 'admin') {
            this.ensureManagerAssignableRole(currentUser, dto.role);
        }
        const updated = await this.prisma.teamMember.update({
            where: { id: member.id },
            data: { role: this.toStoredRole(dto.role) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        systemRole: true,
                        isActive: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return this.toMemberSummary(updated);
    }
    async removeMember(currentUser, teamId, memberId) {
        const team = await this.findManageableTeam(currentUser, teamId);
        const member = await this.prisma.teamMember.findUnique({
            where: { id: memberId },
        });
        if (!member || member.teamId !== team.id) {
            throw new common_1.NotFoundException('Team member not found');
        }
        if (member.userId === currentUser.id && currentUser.systemRole !== 'admin') {
            throw new common_1.ForbiddenException('You cannot remove yourself from a team');
        }
        await this.prisma.teamMember.delete({
            where: { id: member.id },
        });
    }
    async findManageableTeam(currentUser, teamId) {
        const team = await this.findTeamOrFail(teamId);
        if (currentUser.systemRole === 'admin') {
            return team;
        }
        const membership = await this.prisma.teamMember.findFirst({
            where: {
                teamId: team.id,
                userId: currentUser.id,
                role: prisma_client_1.UserRole.MANAGER,
            },
        });
        if (!membership) {
            throw new common_1.ForbiddenException('You cannot manage this team');
        }
        return team;
    }
    async findAccessibleTeam(currentUser, teamId) {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                systemRole: true,
                                isActive: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                _count: { select: { members: true } },
            },
        });
        if (!team) {
            throw new common_1.NotFoundException('Team not found');
        }
        if (currentUser.systemRole === 'admin') {
            return team;
        }
        const hasAccess = await this.prisma.teamMember.findFirst({
            where: {
                teamId: team.id,
                userId: currentUser.id,
                role: prisma_client_1.UserRole.MANAGER,
            },
        });
        if (!hasAccess) {
            throw new common_1.ForbiddenException('You cannot access this team');
        }
        return team;
    }
    async findTeamOrFail(teamId) {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
        });
        if (!team) {
            throw new common_1.NotFoundException('Team not found');
        }
        return team;
    }
    toTeamSummary(team) {
        const members = team.members ?? [];
        return {
            id: team.id,
            name: team.name,
            description: team.description,
            createdById: team.createdById,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
            membersCount: team._count?.members ?? members.length,
            managersCount: members.filter((member) => member.role === prisma_client_1.UserRole.MANAGER).length,
        };
    }
    toMemberSummary(member) {
        return {
            id: member.id,
            teamId: member.teamId,
            userId: member.userId,
            role: this.toSystemRole(member.role),
            joinedAt: member.joinedAt,
            user: {
                id: member.user.id,
                name: member.user.name,
                email: member.user.email,
                systemRole: this.toSystemRole(member.user.systemRole),
                role: member.user.systemRole,
                isActive: member.user.isActive,
                createdAt: member.user.createdAt,
                updatedAt: member.user.updatedAt,
            },
        };
    }
    ensureAdmin(user) {
        if (user.systemRole !== 'admin') {
            throw new common_1.ForbiddenException('Admin access required');
        }
    }
    ensureManagerAssignableRole(user, role) {
        if (user.systemRole === 'admin') {
            return;
        }
        if (role === 'admin') {
            throw new common_1.ForbiddenException('Managers cannot assign admin roles');
        }
        if (user.systemRole !== 'manager') {
            throw new common_1.ForbiddenException('You cannot assign team roles');
        }
    }
    toStoredRole(role) {
        return role.toUpperCase();
    }
    toSystemRole(role) {
        return role.toLowerCase();
    }
    isUniqueConstraintError(error) {
        return (typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === 'P2002');
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamService);
