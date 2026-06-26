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
exports.ReportExportService = void 0;
const common_1 = require("@nestjs/common");
const report_csv_service_1 = require("./report-csv.service");
const report_pdf_service_1 = require("./report-pdf.service");
let ReportExportService = class ReportExportService {
    csvService;
    pdfService;
    constructor(csvService, pdfService) {
        this.csvService = csvService;
        this.pdfService = pdfService;
    }
    async export(kind, format, payload, filename) {
        const buffer = await this.buildBuffer(kind, format, payload);
        return {
            filename,
            contentType: format === 'csv' ? 'text/csv; charset=utf-8' : 'application/pdf',
            buffer,
        };
    }
    buildBuffer(kind, format, payload) {
        if (format === 'csv') {
            switch (kind) {
                case 'detailed':
                    return this.csvService.buildDetailedCsv(payload);
                case 'client-summary':
                    return this.csvService.buildClientSummaryCsv(payload);
                case 'selected-client':
                    return this.csvService.buildSelectedClientCsv(payload);
                case 'task-summary':
                    return this.csvService.buildTaskSummaryCsv(payload);
                case 'team-summary':
                    return this.csvService.buildTeamSummaryCsv(payload);
                default:
                    return this.csvService.buildDetailedCsv(payload);
            }
        }
        switch (kind) {
            case 'detailed':
                return this.pdfService.buildDetailedPdf(payload);
            case 'client-summary':
                return this.pdfService.buildClientSummaryPdf(payload);
            case 'selected-client':
                return this.pdfService.buildSelectedClientPdf(payload);
            case 'task-summary':
                return this.pdfService.buildTaskSummaryPdf(payload);
            case 'team-summary':
                return this.pdfService.buildTeamSummaryPdf(payload);
            default:
                return this.pdfService.buildDetailedPdf(payload);
        }
    }
};
exports.ReportExportService = ReportExportService;
exports.ReportExportService = ReportExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_csv_service_1.ReportCsvService,
        report_pdf_service_1.ReportPdfService])
], ReportExportService);
