import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Controller()
export class WebController {
  private readonly publicRoot = join(process.cwd(), 'public');

  private async servePage(res: Response, fileName: string): Promise<void> {
    res.sendFile(join(this.publicRoot, fileName));
  }

  @Get()
  @Header('Cache-Control', 'no-store')
  async index(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'index.html');
  }

  @Get('login')
  @Header('Cache-Control', 'no-store')
  async login(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'login.html');
  }

  @Get('register')
  @Header('Cache-Control', 'no-store')
  async register(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'register.html');
  }

  @Get('profile')
  @Header('Cache-Control', 'no-store')
  async profile(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'profile.html');
  }

  @Get('timer')
  @Header('Cache-Control', 'no-store')
  async timer(@Res() res: Response): Promise<void> {
    const reactTimerIndex = join(this.publicRoot, 'timer-app', 'index.html');

    if (existsSync(reactTimerIndex)) {
      res.sendFile(reactTimerIndex);
      return;
    }

    await this.servePage(res, 'timer.html');
  }

  @Get('timesheets')
  @Header('Cache-Control', 'no-store')
  async timesheets(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'timesheets.html');
  }

  @Get('reports')
  @Header('Cache-Control', 'no-store')
  async reports(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'reports.html');
  }

  @Get('clients')
  @Header('Cache-Control', 'no-store')
  async clients(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'clients.html');
  }

  @Get('clients/:id')
  @Header('Cache-Control', 'no-store')
  async clientDetails(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'clients.html');
  }

  @Get('tasks')
  @Header('Cache-Control', 'no-store')
  async tasks(@Res() res: Response): Promise<void> {
    const reactTasksIndex = join(this.publicRoot, 'tasks-app', 'index.html');

    if (existsSync(reactTasksIndex)) {
      res.sendFile(reactTasksIndex);
      return;
    }

    await this.servePage(res, 'tasks.html');
  }

  @Get('tasks/:taskId')
  @Header('Cache-Control', 'no-store')
  async taskDetails(@Res() res: Response): Promise<void> {
    const reactTasksIndex = join(this.publicRoot, 'tasks-app', 'index.html');

    if (existsSync(reactTasksIndex)) {
      res.sendFile(reactTasksIndex);
      return;
    }

    await this.servePage(res, 'tasks.html');
  }

  @Get('team')
  @Header('Cache-Control', 'no-store')
  async team(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'team.html');
  }

  @Get('settings')
  @Header('Cache-Control', 'no-store')
  async settings(@Res() res: Response): Promise<void> {
    await this.servePage(res, 'settings.html');
  }
}
