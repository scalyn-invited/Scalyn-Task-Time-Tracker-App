import { mkdirSync } from 'fs';
import { join, extname } from 'path';

export const TASK_UPLOAD_ROOT = join(process.cwd(), 'uploads', 'tasks');
export const MAX_TASK_ATTACHMENT_SIZE = 25 * 1024 * 1024;

export const ALLOWED_TASK_ATTACHMENT_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'text/plain',
  'application/zip',
  'application/x-zip-compressed',
]);

export function ensureTaskUploadRoot(): string {
  mkdirSync(TASK_UPLOAD_ROOT, { recursive: true });
  return TASK_UPLOAD_ROOT;
}

export function buildTaskAttachmentPath(fileName: string): string {
  return join(TASK_UPLOAD_ROOT, fileName);
}

export function getTaskAttachmentExtension(originalName: string): string {
  return extname(originalName).toLowerCase();
}
