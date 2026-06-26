import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import type { User } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload, SafeUser, SystemRole } from './types/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          const accessToken = request.query.accessToken;
          return typeof accessToken === 'string' && accessToken.trim().length > 0
            ? accessToken.trim()
            : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<SafeUser> {
    const userId = Number(payload.sub);

    if (Number.isNaN(userId)) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        systemRole: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    return this.toSafeUser(user);
  }

  private toSafeUser(
    user: Pick<User, 'id' | 'name' | 'email' | 'systemRole' | 'isActive' | 'createdAt' | 'updatedAt'>,
  ): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      systemRole: this.toSystemRole(user.systemRole),
      role: user.systemRole,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private toSystemRole(role: User['systemRole']): SystemRole {
    return role.toLowerCase() as SystemRole;
  }
}
