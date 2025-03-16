import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home') // /home -> Recurso
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Método da solicitação -> Ler (Read) -> CRUD
  // /home/hello
  // @Get('hello')
  getHello(): string {
    // return this.appService.getHello();
    return 'Qualquer coisa.';
  }

  // @Get('exemplo')
  exemplo(): string {
    return this.appService.solucionaExemplo();
  }
}
