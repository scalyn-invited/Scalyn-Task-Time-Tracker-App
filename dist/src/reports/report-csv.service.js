"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCsvService = void 0;
const common_1 = require("@nestjs/common");
const format_1 = require("@fast-csv/format");
let ReportCsvService = class ReportCsvService {
    async buildDetailedCsv(payload) {
        return this.toCsvBuffer(payload.rows.map((row) => this.toDetailedRow(row)));
    }
    async buildClientSummaryCsv(payload) {
        return this.toCsvBuffer(this.groupByClient(payload.rows));
    }
    async buildSelectedClientCsv(payload) {
        return this.toCsvBuffer(payload.rows.map((row) => this.toSelectedClientRow(row, payload)));
    }
    async buildTaskSummaryCsv(payload) {
        return this.toCsvBuffer(this.groupByTask(payload.rows));
    }
    async buildTeamSummaryCsv(payload) {
        return this.toCsvBuffer(this.groupByTeam(payload.rows));
    }
    toDetailedRow(row) {
        return {
            Date: row.date,
            Client: row.client,
            Task: row.task,
            'Team Member': row.teamMember,
            'Start Time': row.startTime,
            'End Time': row.endTime ?? '',
            Duration: row.duration,
            Description: row.description,
            'Entry Type': row.entryType,
        };
    }
    toSelectedClientRow(row, payload) {
        return {
            Client: payload.rows.length > 0 ? payload.rows[0].client : '',
            Date: row.date,
            Task: row.task,
            'Team Member': row.teamMember,
            'Start Time': row.startTime,
            'End Time': row.endTime ?? '',
            Duration: row.duration,
            Description: row.description,
            'Entry Type': row.entryType,
        };
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
        return [...groups.entries()]
            .map(([client, group]) => ({
            Client: client,
            'Number of Tasks': group.tasks.size,
            'Total Time Entries': group.entries,
            'Total Hours': Number(group.hours.toFixed(2)),
        }))
            .sort((left, right) => String(left.Client).localeCompare(String(right.Client)));
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
        return [...groups.entries()]
            .map(([task, group]) => ({
            Task: task,
            Client: group.client,
            'Total Hours': Number(group.hours.toFixed(2)),
            'Number of Entries': group.entries,
        }))
            .sort((left, right) => String(left.Task).localeCompare(String(right.Task)));
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
        return [...groups.entries()]
            .map(([teamMember, group]) => ({
            'Team Member': teamMember,
            'Total Hours': Number(group.hours.toFixed(2)),
            'Number of Tasks': group.tasks.size,
            'Number of Entries': group.entries,
        }))
            .sort((left, right) => String(left['Team Member']).localeCompare(String(right['Team Member'])));
    }
    toCsvBuffer(rows) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            const csvStream = (0, format_1.format)({ headers: true });
            csvStream.on('error', reject);
            csvStream.on('data', (chunk) => {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, 'utf8'));
            });
            csvStream.on('end', () => resolve(Buffer.concat(chunks)));
            rows.forEach((row) => csvStream.write(row));
            csvStream.end();
        });
    }
};
exports.ReportCsvService = ReportCsvService;
exports.ReportCsvService = ReportCsvService = __decorate([
    (0, common_1.Injectable)()
], ReportCsvService);
