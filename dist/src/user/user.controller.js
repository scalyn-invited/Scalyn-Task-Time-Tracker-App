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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const system_roles_decorator_1 = require("../auth/decorators/system-roles.decorator");
const system_roles_guard_1 = require("../auth/guards/system-roles.guard");
const change_password_dto_1 = require("./dto/change-password.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_admin_dto_1 = require("./dto/update-user-admin.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const update_user_status_dto_1 = require("./dto/update-user-status.dto");
const user_management_service_1 = require("./user-management.service");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getCurrentUser(req) {
        return this.userService.getCurrentUser(req.user.id);
    }
    async updateProfile(req, dto) {
        return this.userService.updateProfile(req.user.id, dto);
    }
    async changePassword(req, dto) {
        await this.userService.changePassword(req.user.id, dto);
    }
    async listUsers(req) {
        return this.userService.listUsers(req.user);
    }
    async getUser(req, id) {
        return this.userService.getUser(req.user, id);
    }
    async createUser(req, dto) {
        return this.userService.createUser(req.user, dto);
    }
    async updateUser(req, id, dto) {
        return this.userService.updateUser(req.user, id, dto);
    }
    async updateStatus(req, id, dto) {
        return this.userService.updateStatus(req.user, id, dto);
    }
    async deleteUser(req, id) {
        return this.userService.deleteUser(req.user, id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('me/password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(system_roles_guard_1.SystemRolesGuard),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(system_roles_guard_1.SystemRolesGuard),
    (0, system_roles_decorator_1.SystemRoles)('admin', 'manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(system_roles_guard_1.SystemRolesGuard),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(system_roles_guard_1.SystemRolesGuard),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_admin_dto_1.UpdateUserAdminDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)(system_roles_guard_1.SystemRolesGuard),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_status_dto_1.UpdateUserStatusDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(system_roles_guard_1.SystemRolesGuard),
    (0, system_roles_decorator_1.SystemRoles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_management_service_1.UserManagementService])
], UserController);
