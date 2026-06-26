"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemRoles = exports.SYSTEM_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SYSTEM_ROLES_KEY = 'system_roles';
const SystemRoles = (...roles) => (0, common_1.SetMetadata)(exports.SYSTEM_ROLES_KEY, roles);
exports.SystemRoles = SystemRoles;
