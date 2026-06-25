"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_TASK_ATTACHMENT_MIME_TYPES = exports.MAX_TASK_ATTACHMENT_SIZE = exports.TASK_UPLOAD_ROOT = void 0;
exports.ensureTaskUploadRoot = ensureTaskUploadRoot;
exports.buildTaskAttachmentPath = buildTaskAttachmentPath;
exports.getTaskAttachmentExtension = getTaskAttachmentExtension;
const fs_1 = require("fs");
const path_1 = require("path");
exports.TASK_UPLOAD_ROOT = (0, path_1.join)(process.cwd(), 'uploads', 'tasks');
exports.MAX_TASK_ATTACHMENT_SIZE = 25 * 1024 * 1024;
exports.ALLOWED_TASK_ATTACHMENT_MIME_TYPES = new Set([
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
function ensureTaskUploadRoot() {
    (0, fs_1.mkdirSync)(exports.TASK_UPLOAD_ROOT, { recursive: true });
    return exports.TASK_UPLOAD_ROOT;
}
function buildTaskAttachmentPath(fileName) {
    return (0, path_1.join)(exports.TASK_UPLOAD_ROOT, fileName);
}
function getTaskAttachmentExtension(originalName) {
    return (0, path_1.extname)(originalName).toLowerCase();
}
