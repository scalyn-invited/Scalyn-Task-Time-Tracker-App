import { SetMetadata } from '@nestjs/common';
import type { SystemRole } from '../types/auth.types';

export const SYSTEM_ROLES_KEY = 'system_roles';

export const SystemRoles = (...roles: SystemRole[]) => SetMetadata(SYSTEM_ROLES_KEY, roles);
