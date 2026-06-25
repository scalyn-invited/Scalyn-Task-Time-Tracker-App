import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import type { Client } from '../generated/prisma';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SafeUser } from '../auth/types/auth.types';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';

interface AuthenticatedRequest extends Request {
  user: SafeUser;
}

@UseGuards(JwtAuthGuard)
@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async findAll(@Req() req: AuthenticatedRequest): Promise<Client[]> {
    return this.clientService.listActive(req.user.id);
  }

  @Get('archived')
  @Header('Cache-Control', 'no-store')
  async findArchived(@Req() req: AuthenticatedRequest): Promise<Client[]> {
    return this.clientService.listArchived(req.user.id);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-store')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Client> {
    return this.clientService.findOne(req.user.id, id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateClientDto,
  ): Promise<Client> {
    return this.clientService.create(req.user.id, dto);
  }

  @Patch(':id')
  @Header('Cache-Control', 'no-store')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(req.user.id, id, dto);
  }

  @Patch(':id/archive')
  @Header('Cache-Control', 'no-store')
  async archive(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Client> {
    return this.clientService.archive(req.user.id, id);
  }

  @Patch(':id/restore')
  @Header('Cache-Control', 'no-store')
  async restore(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Client> {
    return this.clientService.restore(req.user.id, id);
  }

  @Delete(':id')
  @Header('Cache-Control', 'no-store')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Client> {
    return this.clientService.archive(req.user.id, id);
  }
}
