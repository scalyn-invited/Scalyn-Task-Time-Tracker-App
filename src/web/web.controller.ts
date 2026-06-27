import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class WebController {
  private readonly publicRoot = join(process.cwd(), 'public');
  private readonly spaIndexPath = join(this.publicRoot, 'app', 'index.html');

  private async serveSpa(res: Response): Promise<void> {
    res.sendFile(this.spaIndexPath);
  }

  @Get()
  @Header('Cache-Control', 'no-store')
  async index(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }

  @Get('*')
  @Header('Cache-Control', 'no-store')
  async spaFallback(@Res() res: Response): Promise<void> {
    await this.serveSpa(res);
  }
}
