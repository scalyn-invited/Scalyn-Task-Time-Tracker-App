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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const bulk_client_ids_dto_1 = require("./dto/bulk-client-ids.dto");
const create_client_dto_1 = require("./dto/create-client.dto");
const update_client_dto_1 = require("./dto/update-client.dto");
const client_service_1 = require("./client.service");
let ClientController = class ClientController {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    async findAll(req) {
        return this.clientService.listActive(req.user.id);
    }
    async findArchived(req) {
        return this.clientService.listArchived(req.user.id);
    }
    async findOne(req, id) {
        return this.clientService.findOne(req.user.id, id);
    }
    async create(req, dto) {
        return this.clientService.create(req.user.id, dto);
    }
    async update(req, id, dto) {
        return this.clientService.update(req.user.id, id, dto);
    }
    async bulkArchive(req, dto) {
        return this.clientService.bulkArchive(req.user.id, dto.clientIds);
    }
    async archive(req, id) {
        return this.clientService.archive(req.user.id, id);
    }
    async bulkRestore(req, dto) {
        return this.clientService.bulkRestore(req.user.id, dto.clientIds);
    }
    async restore(req, id) {
        return this.clientService.restore(req.user.id, id);
    }
    async remove(req, id) {
        return this.clientService.archive(req.user.id, id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findArchived", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('bulk/archive'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_client_ids_dto_1.BulkClientIdsDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "bulkArchive", null);
__decorate([
    (0, common_1.Patch)(':id/archive'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "archive", null);
__decorate([
    (0, common_1.Patch)('bulk/restore'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_client_ids_dto_1.BulkClientIdsDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "bulkRestore", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "remove", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
