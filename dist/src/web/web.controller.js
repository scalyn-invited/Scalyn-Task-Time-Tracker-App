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
exports.WebController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let WebController = class WebController {
    publicRoot = (0, path_1.join)(process.cwd(), 'public');
    async servePage(res, fileName) {
        res.sendFile((0, path_1.join)(this.publicRoot, fileName));
    }
    async index(res) {
        res.redirect(302, '/timer');
    }
    async login(res) {
        await this.servePage(res, 'login.html');
    }
    async register(res) {
        await this.servePage(res, 'register.html');
    }
    async profile(res) {
        await this.servePage(res, 'profile.html');
    }
    async timer(res) {
        const reactTimerIndex = (0, path_1.join)(this.publicRoot, 'timer-app', 'index.html');
        if ((0, fs_1.existsSync)(reactTimerIndex)) {
            res.sendFile(reactTimerIndex);
            return;
        }
        await this.servePage(res, 'timer.html');
    }
    async timesheets(res) {
        await this.servePage(res, 'timesheets.html');
    }
    async reports(res) {
        const reactReportsIndex = (0, path_1.join)(this.publicRoot, 'reports-app', 'index.html');
        if ((0, fs_1.existsSync)(reactReportsIndex)) {
            res.sendFile(reactReportsIndex);
            return;
        }
        await this.servePage(res, 'reports.html');
    }
    async clients(res) {
        await this.servePage(res, 'clients.html');
    }
    async users(res) {
        await this.servePage(res, 'users.html');
    }
    async clientDetails(res) {
        await this.servePage(res, 'clients.html');
    }
    async tasks(res) {
        const reactTasksIndex = (0, path_1.join)(this.publicRoot, 'tasks-app', 'index.html');
        if ((0, fs_1.existsSync)(reactTasksIndex)) {
            res.sendFile(reactTasksIndex);
            return;
        }
        await this.servePage(res, 'tasks.html');
    }
    async taskDetails(res) {
        const reactTasksIndex = (0, path_1.join)(this.publicRoot, 'tasks-app', 'index.html');
        if ((0, fs_1.existsSync)(reactTasksIndex)) {
            res.sendFile(reactTasksIndex);
            return;
        }
        await this.servePage(res, 'tasks.html');
    }
    async team(res) {
        const reactTeamIndex = (0, path_1.join)(this.publicRoot, 'team-app', 'index.html');
        if ((0, fs_1.existsSync)(reactTeamIndex)) {
            res.sendFile(reactTeamIndex);
            return;
        }
        await this.servePage(res, 'team.html');
    }
    async teamDeepLink(res) {
        const reactTeamIndex = (0, path_1.join)(this.publicRoot, 'team-app', 'index.html');
        if ((0, fs_1.existsSync)(reactTeamIndex)) {
            res.sendFile(reactTeamIndex);
            return;
        }
        await this.servePage(res, 'team.html');
    }
    async settings(res) {
        await this.servePage(res, 'settings.html');
    }
};
exports.WebController = WebController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('timer'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "timer", null);
__decorate([
    (0, common_1.Get)('timesheets'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "timesheets", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "reports", null);
__decorate([
    (0, common_1.Get)('clients'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "clients", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "users", null);
__decorate([
    (0, common_1.Get)('clients/:id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "clientDetails", null);
__decorate([
    (0, common_1.Get)('tasks'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "tasks", null);
__decorate([
    (0, common_1.Get)('tasks/:taskId'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "taskDetails", null);
__decorate([
    (0, common_1.Get)('team'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "team", null);
__decorate([
    (0, common_1.Get)('team/*'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "teamDeepLink", null);
__decorate([
    (0, common_1.Get)('settings'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebController.prototype, "settings", null);
exports.WebController = WebController = __decorate([
    (0, common_1.Controller)()
], WebController);
