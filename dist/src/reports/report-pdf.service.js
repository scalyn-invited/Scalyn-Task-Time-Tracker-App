"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportPdfService = void 0;
const common_1 = require("@nestjs/common");
const pdfmake_1 = __importDefault(require("pdfmake"));
const path_1 = require("path");
const fonts = {
    Roboto: {
        normal: (0, path_1.resolve)(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf'),
        bold: (0, path_1.resolve)(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf'),
        italics: (0, path_1.resolve)(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf'),
        bolditalics: (0, path_1.resolve)(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf'),
    },
};
pdfmake_1.default.addFonts(fonts);
let ReportPdfService = class ReportPdfService {
    async buildDetailedPdf(payload) {
        return this.renderDocument(this.buildDetailedDefinition(payload));
    }
    async buildClientSummaryPdf(payload) {
        return this.renderDocument(this.buildSummaryDefinition('Client Summary', payload, this.groupByClient(payload.rows), [
            'Client',
            'Number of Tasks',
            'Total Time Entries',
            'Total Hours',
        ]));
    }
    async buildSelectedClientPdf(payload) {
        const clientName = payload.rows[0]?.client ?? 'Selected client';
        return this.renderDocument(this.buildSelectedClientDefinition(payload, clientName));
    }
    async buildTaskSummaryPdf(payload) {
        return this.renderDocument(this.buildSummaryDefinition('Task Summary', payload, this.groupByTask(payload.rows), [
            'Task',
            'Client',
            'Entries',
            'Total Hours',
        ]));
    }
    async buildTeamSummaryPdf(payload) {
        return this.renderDocument(this.buildSummaryDefinition('Team Summary', payload, this.groupByTeam(payload.rows), [
            'Team Member',
            'Tasks',
            'Entries',
            'Total Hours',
        ]));
    }
    buildDetailedDefinition(payload) {
        return this.buildBaseDefinition('Detailed Report', payload, [
            'Date',
            'Client',
            'Task',
            'Team Member',
            'Start Time',
            'End Time',
            'Duration',
        ], payload.rows.map((row) => [
            row.date,
            row.client,
            row.task,
            row.teamMember,
            row.startTime,
            row.endTime ?? '-',
            row.duration,
        ]));
    }
    buildSelectedClientDefinition(payload, clientName) {
        return this.buildBaseDefinition('Selected Client Report', payload, [
            'Date',
            'Task',
            'Team Member',
            'Start Time',
            'End Time',
            'Duration',
            'Entry Type',
        ], payload.rows.map((row) => [
            row.date,
            row.task,
            row.teamMember,
            row.startTime,
            row.endTime ?? '-',
            row.duration,
            row.entryType,
        ]), [
            {
                text: `Client Name: ${clientName}`,
                style: 'subtle',
                margin: [0, 8, 0, 2],
            },
            {
                text: `Selected Date Range: ${payload.range.label}`,
                style: 'subtle',
                margin: [0, 0, 0, 12],
            },
        ]);
    }
    buildSummaryDefinition(title, payload, rows, headers) {
        return this.buildBaseDefinition(title, payload, headers, rows.map((row) => Object.values(row)));
    }
    buildBaseDefinition(reportTitle, payload, headers, rows, extraContent = []) {
        return {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [32, 110, 32, 54],
            defaultStyle: {
                font: 'Roboto',
                fontSize: 9,
                color: '#1f2d3d',
            },
            header: () => ({
                margin: [32, 20, 32, 0],
                stack: [
                    {
                        columns: [
                            {
                                stack: [
                                    { text: 'Scalyn Task Time Tracker', style: 'company' },
                                    { text: reportTitle, style: 'reportTitle' },
                                ],
                            },
                            {
                                stack: [
                                    { text: `Generated: ${new Date().toLocaleString()}`, style: 'meta', alignment: 'right' },
                                    { text: `Filters: ${this.describeFilters(payload)}`, style: 'meta', alignment: 'right' },
                                ],
                            },
                        ],
                    },
                ],
            }),
            footer: (currentPage, pageCount) => ({
                margin: [32, 0, 32, 18],
                columns: [
                    { text: 'Generated by Scalyn Task Time Tracker', style: 'footer', alignment: 'left' },
                    { text: `Page ${currentPage} of ${pageCount}`, style: 'footer', alignment: 'right' },
                ],
            }),
            content: [
                {
                    text: `Period: ${payload.range.label}`,
                    style: 'subtle',
                    margin: [0, 0, 0, 6],
                },
                {
                    columns: [
                        this.metricCard('Total Hours', `${payload.summary.totalHours.toFixed(2)} h`),
                        this.metricCard('Total Entries', String(payload.summary.totalTimeEntries)),
                        this.metricCard('Total Clients', String(payload.summary.activeClients)),
                        this.metricCard('Total Tasks', String(payload.summary.activeTasks)),
                    ],
                    columnGap: 10,
                    margin: [0, 0, 0, 12],
                },
                ...extraContent,
                {
                    table: {
                        headerRows: 1,
                        widths: this.getColumnWidths(headers.length),
                        body: [
                            headers.map((header) => ({ text: header, style: 'tableHeader' })),
                            ...rows,
                        ],
                    },
                    layout: {
                        fillColor: (rowIndex) => {
                            if (rowIndex === 0) {
                                return '#16325c';
                            }
                            return rowIndex % 2 === 0 ? '#f4f7fb' : '#ffffff';
                        },
                        hLineColor: () => '#d8e0ea',
                        vLineColor: () => '#d8e0ea',
                        paddingLeft: () => 6,
                        paddingRight: () => 6,
                        paddingTop: () => 5,
                        paddingBottom: () => 5,
                    },
                    margin: [0, 0, 0, 0],
                },
            ],
            styles: {
                company: {
                    fontSize: 14,
                    bold: true,
                    color: '#16325c',
                },
                reportTitle: {
                    fontSize: 20,
                    bold: true,
                    color: '#0f172a',
                },
                meta: {
                    fontSize: 8.5,
                    color: '#5b6b80',
                },
                subtle: {
                    fontSize: 8.5,
                    color: '#5b6b80',
                },
                footer: {
                    fontSize: 8,
                    color: '#6b7280',
                },
                cardLabel: {
                    fontSize: 8,
                    color: '#5b6b80',
                    bold: true,
                },
                cardValue: {
                    fontSize: 14,
                    bold: true,
                    color: '#0f172a',
                },
                tableHeader: {
                    bold: true,
                    color: '#ffffff',
                },
            },
        };
    }
    metricCard(label, value) {
        return {
            table: {
                widths: ['*'],
                body: [
                    [{ text: label, style: 'cardLabel' }],
                    [{ text: value, style: 'cardValue' }],
                ],
            },
            layout: {
                fillColor: () => '#f8fbff',
                hLineColor: () => '#d8e0ea',
                vLineColor: () => '#d8e0ea',
                paddingLeft: () => 10,
                paddingRight: () => 10,
                paddingTop: () => 8,
                paddingBottom: () => 8,
            },
        };
    }
    getColumnWidths(columnCount) {
        if (columnCount <= 4) {
            return Array.from({ length: columnCount }, () => '*');
        }
        return Array.from({ length: columnCount }, (_, index) => (index === 0 ? 90 : '*'));
    }
    describeFilters(payload) {
        const filters = [
            payload.filters.preset,
            payload.filters.clientId ? `client:${payload.filters.clientId}` : null,
            payload.filters.taskId ? `task:${payload.filters.taskId}` : null,
            payload.filters.userId ? `user:${payload.filters.userId}` : null,
            payload.filters.entryType !== 'all' ? `type:${payload.filters.entryType}` : null,
            payload.filters.status && payload.filters.status !== 'all' ? `status:${payload.filters.status}` : null,
            payload.filters.billable !== 'all' ? `billable:${payload.filters.billable}` : null,
            payload.filters.search ? `search:${payload.filters.search}` : null,
        ].filter(Boolean);
        return filters.join(', ') || 'none';
    }
    groupByClient(rows) {
        const groups = new Map();
        for (const row of rows) {
            const existing = groups.get(row.client) ?? {
                tasks: new Set(),
                entries: 0,
                hours: 0,
            };
            existing.tasks.add(row.task);
            existing.entries += 1;
            existing.hours += row.durationSeconds / 3600;
            groups.set(row.client, existing);
        }
        return [...groups.entries()].map(([client, group]) => ({
            Client: client,
            'Number of Tasks': group.tasks.size,
            'Total Time Entries': group.entries,
            'Total Hours': Number(group.hours.toFixed(2)),
        }));
    }
    groupByTask(rows) {
        const groups = new Map();
        for (const row of rows) {
            const existing = groups.get(row.task) ?? {
                client: row.client,
                entries: 0,
                hours: 0,
            };
            existing.entries += 1;
            existing.hours += row.durationSeconds / 3600;
            groups.set(row.task, existing);
        }
        return [...groups.entries()].map(([task, group]) => ({
            Task: task,
            Client: group.client,
            Entries: group.entries,
            'Total Hours': Number(group.hours.toFixed(2)),
        }));
    }
    groupByTeam(rows) {
        const groups = new Map();
        for (const row of rows) {
            const existing = groups.get(row.teamMember) ?? {
                tasks: new Set(),
                entries: 0,
                hours: 0,
            };
            existing.tasks.add(row.task);
            existing.entries += 1;
            existing.hours += row.durationSeconds / 3600;
            groups.set(row.teamMember, existing);
        }
        return [...groups.entries()].map(([teamMember, group]) => ({
            'Team Member': teamMember,
            Tasks: group.tasks.size,
            Entries: group.entries,
            'Total Hours': Number(group.hours.toFixed(2)),
        }));
    }
    async renderDocument(definition) {
        return pdfmake_1.default.createPdf(definition).getBuffer();
    }
};
exports.ReportPdfService = ReportPdfService;
exports.ReportPdfService = ReportPdfService = __decorate([
    (0, common_1.Injectable)()
], ReportPdfService);
