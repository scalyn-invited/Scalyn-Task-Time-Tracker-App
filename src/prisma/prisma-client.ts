import { join } from 'path';
import type * as GeneratedPrisma from '../generated/prisma';

const sourceClientPath = join(process.cwd(), 'src', 'generated', 'prisma');

function loadPrismaRuntime(): typeof GeneratedPrisma {
  try {
    return require(sourceClientPath) as typeof GeneratedPrisma;
  } catch (_error) {
    return require('@prisma/client') as typeof GeneratedPrisma;
  }
}

const prismaRuntime = loadPrismaRuntime();

export const PrismaClient = prismaRuntime.PrismaClient;
export const Prisma = prismaRuntime.Prisma;
export const TaskPriority = prismaRuntime.TaskPriority;
export const TaskStatus = prismaRuntime.TaskStatus;
export const TaskActivityAction = prismaRuntime.TaskActivityAction;
export const TimeEntryStatus = prismaRuntime.TimeEntryStatus;
export const UserRole = prismaRuntime.UserRole;
