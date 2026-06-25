"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.TimeEntryStatus = exports.TaskActivityAction = exports.TaskStatus = exports.TaskPriority = exports.Prisma = exports.PrismaClient = void 0;
const path_1 = require("path");
const sourceClientPath = (0, path_1.join)(process.cwd(), 'src', 'generated', 'prisma');
function loadPrismaRuntime() {
    try {
        return require(sourceClientPath);
    }
    catch (_error) {
        return require('@prisma/client');
    }
}
const prismaRuntime = loadPrismaRuntime();
exports.PrismaClient = prismaRuntime.PrismaClient;
exports.Prisma = prismaRuntime.Prisma;
exports.TaskPriority = prismaRuntime.TaskPriority;
exports.TaskStatus = prismaRuntime.TaskStatus;
exports.TaskActivityAction = prismaRuntime.TaskActivityAction;
exports.TimeEntryStatus = prismaRuntime.TimeEntryStatus;
exports.UserRole = prismaRuntime.UserRole;
