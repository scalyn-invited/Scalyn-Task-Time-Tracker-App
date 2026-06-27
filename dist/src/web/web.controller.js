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
const path_1 = require("path");
let WebController = class WebController {
    publicRoot = (0, path_1.join)(process.cwd(), 'public');
    async serveSpa(res) {
        res.sendFile((0, path_1.join)(this.publicRoot, 'app', 'index.html'));
    }
    async index(res) {
        await this.serveSpa(res);
    }
    async login(res) {
        await this.serveSpa(res);
    }
    async register(res) {
        await this.serveSpa(res);
    }
    async profile(res) {
        await this.serveSpa(res);
    }
    async timer(res) {
        await this.serveSpa(res);
    }
    async timesheets(res) {
        await this.serveSpa(res);
    }
    async reports(res) {
        await this.serveSpa(res);
    }
    async clients(res) {
        await this.serveSpa(res);
    }
    async users(res) {
        await this.serveSpa(res);
    }
    async clientDetails(res) {
        await this.serveSpa(res);
    }
    async tasks(res) {
        await this.serveSpa(res);
    }
    async taskDetails(res) {
        await this.serveSpa(res);
    }
    async team(res) {
        await this.serveSpa(res);
    }
    async teamDeepLink(res) {
        await this.serveSpa(res);
    }
    async settings(res) {
        await this.serveSpa(res);
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
