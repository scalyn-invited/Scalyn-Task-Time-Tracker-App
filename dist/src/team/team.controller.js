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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const system_roles_decorator_1 = require("../auth/decorators/system-roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const system_roles_guard_1 = require("../auth/guards/system-roles.guard");
const add_team_member_dto_1 = require("./dto/add-team-member.dto");
const create_team_dto_1 = require("./dto/create-team.dto");
const update_team_dto_1 = require("./dto/update-team.dto");
const update_team_member_dto_1 = require("./dto/update-team-member.dto");
const team_service_1 = require("./team.service");
let TeamController = class TeamController {
    teamService;
    constructor(teamService) {
        this.teamService = teamService;
    }
    async listTeams(req) {
        return this.teamService.listTeams(req.user);
    }
    async getTeam(req, id) {
        return this.teamService.getTeam(req.user, id);
    }
    async createTeam(req, dto) {
        return this.teamService.createTeam(req.user, dto);
    }
    async updateTeam(req, id, dto) {
        return this.teamService.updateTeam(req.user, id, dto);
    }
    async deleteTeam(req, id) {
        return this.teamService.deleteTeam(req.user, id);
    }
    async listMembers(req, id) {
        return this.teamService.listMembers(req.user, id);
    }
    async addMember(req, id, dto) {
        return this.teamService.addMember(req.user, id, dto);
    }
    async updateMember(req, id, memberId, dto) {
        return this.teamService.updateMember(req.user, id, memberId, dto);
    }
    async removeMember(req, id, memberId) {
        await this.teamService.removeMember(req.user, id, memberId);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Get)(),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "listTeams", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Post)(),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "updateTeam", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "deleteTeam", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "listMembers", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, add_team_member_dto_1.AddTeamMemberDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "addMember", null);
__decorate([
    (0, common_1.Put)(':id/members/:memberId'),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('memberId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, update_team_member_dto_1.UpdateTeamMemberDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:memberId'),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('memberId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "removeMember", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, system_roles_guard_1.SystemRolesGuard),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
