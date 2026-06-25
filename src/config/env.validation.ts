export interface EnvironmentVariables {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN?: string;
  BCRYPT_SALT_ROUNDS?: string;
  PORT?: string;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const databaseUrl = config.DATABASE_URL;
  const jwtSecret = config.JWT_SECRET;

  if (typeof databaseUrl !== 'string' || databaseUrl.length === 0) {
    throw new Error('DATABASE_URL is required');
  }

  if (typeof jwtSecret !== 'string' || jwtSecret.length < 16) {
    throw new Error('JWT_SECRET is required and must be at least 16 characters long');
  }

  return {
    DATABASE_URL: databaseUrl,
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN: typeof config.JWT_EXPIRES_IN === 'string' ? config.JWT_EXPIRES_IN : '1d',
    BCRYPT_SALT_ROUNDS:
      typeof config.BCRYPT_SALT_ROUNDS === 'string' ? config.BCRYPT_SALT_ROUNDS : '12',
    PORT: typeof config.PORT === 'string' ? config.PORT : '3000',
  };
}
