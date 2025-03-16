import { Injectable } from '@nestjs/common';

// Esse decorator indica para o NestJS que essa classe é injetável, que ela vai participar do sistema de
// injeção de dependência do NestJS e essa classe pode ter métodos que fazem o que você quiser
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  solucionaExemplo(): string {
    return 'Exemplo usa o service.';
  }
}
