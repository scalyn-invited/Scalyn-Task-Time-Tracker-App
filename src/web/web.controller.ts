import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class WebController {
  private readonly publicRoot = join(process.cwd(), 'public');

  private async serveSpa(res: Response): Promise<void> {
    res.sendFile(join(this.publicRoot, 'app', 'index.html'));
  }

  @Get()
  @Header('Cache-Control', 'no-store')
  async index(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('login')
  @Header('Cache-Control', 'no-store')
  async login(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('register')
  @Header('Cache-Control', 'no-store')
  async register(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('profile')
  @Header('Cache-Control', 'no-store')
  async profile(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('timer')
  @Header('Cache-Control', 'no-store')
  async timer(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('timesheets')
  @Header('Cache-Control', 'no-store')
  async timesheets(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('reports')
  @Header('Cache-Control', 'no-store')
  async reports(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('clients')
  @Header('Cache-Control', 'no-store')
  async clients(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('users')
  @Header('Cache-Control', 'no-store')
  async users(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('clients/:id')
  @Header('Cache-Control', 'no-store')
  async clientDetails(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('tasks')
  @Header('Cache-Control', 'no-store')
  async tasks(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('tasks/:taskId')
  @Header('Cache-Control', 'no-store')
  async taskDetails(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('team')
  @Header('Cache-Control', 'no-store')
  async team(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('team/*')
  @Header('Cache-Control', 'no-store')
  async teamDeepLink(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('settings')
  @Header('Cache-Control', 'no-store')
  async settings(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }
}
