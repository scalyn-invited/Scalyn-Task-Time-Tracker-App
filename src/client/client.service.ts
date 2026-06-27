import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Client } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateClientDto): Promise<Client> {
    const data = this.normalizePayload({
      name: dto.name,
      description: dto.description,
      monthlyAllowanceMinutes: dto.monthlyAllowanceMinutes,
      billable: dto.billable,
    });

    return this.prisma.client.create({
      data: {
        ...data,
        userId,
        archivedAt: null,
      },
    });
  }

  async listActive(userId: number): Promise<Client[]> {
    return this.prisma.client.findMany({
      where: {
        userId,
        archivedAt: null,
      },
      orderBy: [{ name: 'asc' }, { updatedAt: 'desc' }],
    });
  }

  async listArchived(userId: number): Promise<Client[]> {
    return this.prisma.client.findMany({
      where: {
        userId,
        archivedAt: { not: null },
      },
      orderBy: [{ archivedAt: 'desc' }, { name: 'asc' }],
    });
  }

  async findOne(userId: number, clientId: number): Promise<Client> {
    return this.findOwnedClientOrFail(userId, clientId);
  }

  async findAll(userId: number): Promise<Client[]> {
    return this.listActive(userId);
  }

  async update(
    userId: number,
    clientId: number,
    dto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.findOwnedClientOrFail(userId, clientId);
    const data = this.normalizeUpdatePayload(dto);

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    return this.prisma.client.update({
      where: { id: client.id },
      data,
    });
  }

  async archive(userId: number, clientId: number): Promise<Client> {
    const client = await this.findOwnedClientOrFail(userId, clientId);

    return this.prisma.client.update({
      where: { id: client.id },
      data: {
        archivedAt: new Date(),
      },
    });
  }

  async restore(userId: number, clientId: number): Promise<Client> {
    const client = await this.findOwnedClientOrFail(userId, clientId);

    return this.prisma.client.update({
      where: { id: client.id },
      data: {
        archivedAt: null,
      },
    });
  }

  async remove(userId: number, clientId: number): Promise<Client> {
    return this.archive(userId, clientId);
  }

  async bulkArchive(userId: number, clientIds: number[]): Promise<{ count: number }> {
    const clients = await this.prisma.client.findMany({
      where: {
        id: { in: clientIds },
        userId,
      },
      select: { id: true },
    });

    if (clients.length !== clientIds.length) {
      throw new NotFoundException('One or more clients were not found');
    }

    await this.prisma.client.updateMany({
      where: { id: { in: clientIds } },
      data: { archivedAt: new Date() },
    });

    return { count: clientIds.length };
  }

  async bulkRestore(userId: number, clientIds: number[]): Promise<{ count: number }> {
    const clients = await this.prisma.client.findMany({
      where: {
        id: { in: clientIds },
        userId,
      },
      select: { id: true },
    });

    if (clients.length !== clientIds.length) {
      throw new NotFoundException('One or more clients were not found');
    }

    await this.prisma.client.updateMany({
      where: { id: { in: clientIds } },
      data: { archivedAt: null },
    });

    return { count: clientIds.length };
  }

  private async findOwnedClientOrFail(
    userId: number,
    clientId: number,
  ): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  private normalizeUpdatePayload(
    dto: UpdateClientDto,
  ): Partial<{
    name: string;
    description: string | null;
    monthlyAllowanceMinutes: number;
    billable: boolean;
  }> {
    const data: Partial<{
      name: string;
      description: string | null;
      monthlyAllowanceMinutes: number;
      billable: boolean;
    }> = {};

    if (dto.name !== undefined) {
      data.name = this.normalizeName(dto.name);
    }

    if (dto.description !== undefined) {
      data.description = this.normalizeDescription(dto.description);
    }

    if (dto.monthlyAllowanceMinutes !== undefined) {
      data.monthlyAllowanceMinutes = this.normalizeAllowance(
        dto.monthlyAllowanceMinutes,
      );
    }

    if (dto.billable !== undefined) {
      data.billable = dto.billable;
    }

    return data;
  }

  private normalizePayload(input: {
    name: string;
    description?: string;
    monthlyAllowanceMinutes: number;
    billable: boolean;
  }): {
    name: string;
    description: string | null;
    monthlyAllowanceMinutes: number;
    billable: boolean;
  } {
    return {
      name: this.normalizeName(input.name),
      description: this.normalizeDescription(input.description),
      monthlyAllowanceMinutes: this.normalizeAllowance(
        input.monthlyAllowanceMinutes,
      ),
      billable: input.billable,
    };
  }

  private normalizeName(name: string): string {
    const normalizedName = name.trim();

    if (normalizedName.length < 2 || normalizedName.length > 120) {
      throw new BadRequestException(
        'Client name must be between 2 and 120 characters',
      );
    }

    return normalizedName;
  }

  private normalizeDescription(description?: string): string | null {
    if (description === undefined) {
      return null;
    }

    const normalizedDescription = description.trim();
    return normalizedDescription.length > 0 ? normalizedDescription : null;
  }

  private normalizeAllowance(value: number): number {
    if (!Number.isInteger(value) || value < 0) {
      throw new BadRequestException(
        'Monthly allowance must be a non-negative whole number of minutes',
      );
    }

    return value;
  }
}
