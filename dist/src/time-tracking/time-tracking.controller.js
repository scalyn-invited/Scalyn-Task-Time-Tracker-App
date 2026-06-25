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
exports.TimeTrackingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const manual_entry_dto_1 = require("./dto/manual-entry.dto");
const start_timer_dto_1 = require("./dto/start-timer.dto");
const stop_timer_dto_1 = require("./dto/stop-timer.dto");
const time_tracking_service_1 = require("./time-tracking.service");
let TimeTrackingController = class TimeTrackingController {
    timeTrackingService;
    constructor(timeTrackingService) {
        this.timeTrackingService = timeTrackingService;
    }
    async getActive(req) {
        return this.timeTrackingService.getActiveTimer(req.user.id);
    }
    async start(req, dto) {
        return this.timeTrackingService.startTimer(req.user.id, dto);
    }
    async stop(req, dto) {
        return this.timeTrackingService.stopTimer(req.user.id, dto);
    }
    async manual(req, dto) {
        return this.timeTrackingService.createManualEntry(req.user.id, dto);
    }
};
exports.TimeTrackingController = TimeTrackingController;
__decorate([
    (0, common_1.Get)('active'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeTrackingController.prototype, "getActive", null);
__decorate([
    (0, common_1.Post)('start'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, start_timer_dto_1.StartTimerDto]),
    __metadata("design:returntype", Promise)
], TimeTrackingController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('stop'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, stop_timer_dto_1.StopTimerDto]),
    __metadata("design:returntype", Promise)
], TimeTrackingController.prototype, "stop", null);
__decorate([
    (0, common_1.Post)('manual'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, manual_entry_dto_1.ManualEntryDto]),
    __metadata("design:returntype", Promise)
], TimeTrackingController.prototype, "manual", null);
exports.TimeTrackingController = TimeTrackingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('timer'),
    __metadata("design:paramtypes", [time_tracking_service_1.TimeTrackingService])
], TimeTrackingController);
