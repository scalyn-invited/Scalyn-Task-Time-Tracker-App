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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const report_query_dto_1 = require("./dto/report-query.dto");
const report_export_service_1 = require("./report-export.service");
const reports_service_1 = require("./reports.service");
let ReportsController = class ReportsController {
    reportsService;
    reportExportService;
    constructor(reportsService, reportExportService) {
        this.reportsService = reportsService;
        this.reportExportService = reportExportService;
    }
    async getData(req, query) {
        return this.reportsService.getDashboardData(req.user, query);
    }
    async getTable(req, query) {
        return this.reportsService.getTableData(req.user, query);
    }
    async exportDetailedCsv(req, query, res) {
        await this.sendExport(res, 'detailed', 'csv', req.user, query);
    }
    async exportDetailedPdf(req, query, res) {
        await this.sendExport(res, 'detailed', 'pdf', req.user, query);
    }
    async exportClientSummaryCsv(req, query, res) {
        await this.sendExport(res, 'client-summary', 'csv', req.user, query);
    }
    async exportClientSummaryPdf(req, query, res) {
        await this.sendExport(res, 'client-summary', 'pdf', req.user, query);
    }
    async exportClientCsv(req, clientId, query, res) {
        await this.sendExport(res, 'selected-client', 'csv', req.user, query, clientId);
    }
    async exportClientPdf(req, clientId, query, res) {
        await this.sendExport(res, 'selected-client', 'pdf', req.user, query, clientId);
    }
    async exportTaskCsv(req, query, res) {
        await this.sendExport(res, 'task-summary', 'csv', req.user, query);
    }
    async exportTaskPdf(req, query, res) {
        await this.sendExport(res, 'task-summary', 'pdf', req.user, query);
    }
    async exportTeamCsv(req, query, res) {
        await this.sendExport(res, 'team-summary', 'csv', req.user, query);
    }
    async exportTeamPdf(req, query, res) {
        await this.sendExport(res, 'team-summary', 'pdf', req.user, query);
    }
    async sendExport(res, kind, format, user, query, selectedClientId) {
        const payload = await this.reportsService.buildExportPayload(user, query, selectedClientId);
        const filename = this.buildFilename(kind, format, selectedClientId, payload.filters.clientId, selectedClientId !== undefined ? payload.rows[0]?.client : undefined);
        const result = await this.reportExportService.export(kind, format, payload, filename);
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.buffer);
    }
    buildFilename(kind, format, selectedClientId, clientFilterId, clientName) {
        const today = new Date().toISOString().slice(0, 10);
        if (kind === 'selected-client') {
            const clientPart = this.slugify(clientName) ?? `client-${selectedClientId ?? clientFilterId ?? 'report'}`;
            return `${clientPart}-${today}.${format}`;
        }
        if (kind === 'client-summary') {
            return `client-summary-${today}.${format}`;
        }
        if (kind === 'task-summary') {
            return `task-summary-${today}.${format}`;
        }
        if (kind === 'team-summary') {
            return `team-summary-${today}.${format}`;
        }
        return `time-report-${today}.${format}`;
    }
    slugify(value) {
        if (!value) {
            return null;
        }
        const slug = value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return slug.length > 0 ? slug : null;
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('data'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getData", null);
__decorate([
    (0, common_1.Get)('data/table'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getTable", null);
__decorate([
    (0, common_1.Get)('export/detailed/csv'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportDetailedCsv", null);
__decorate([
    (0, common_1.Get)('export/detailed/pdf'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportDetailedPdf", null);
__decorate([
    (0, common_1.Get)('export/client-summary/csv'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportClientSummaryCsv", null);
__decorate([
    (0, common_1.Get)('export/client-summary/pdf'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportClientSummaryPdf", null);
__decorate([
    (0, common_1.Get)('export/client/:clientId/csv'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportClientCsv", null);
__decorate([
    (0, common_1.Get)('export/client/:clientId/pdf'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportClientPdf", null);
__decorate([
    (0, common_1.Get)('export/task-summary/csv'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportTaskCsv", null);
__decorate([
    (0, common_1.Get)('export/task-summary/pdf'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportTaskPdf", null);
__decorate([
    (0, common_1.Get)('export/team-summary/csv'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportTeamCsv", null);
__decorate([
    (0, common_1.Get)('export/team-summary/pdf'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_query_dto_1.ReportQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportTeamPdf", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService,
        report_export_service_1.ReportExportService])
], ReportsController);
