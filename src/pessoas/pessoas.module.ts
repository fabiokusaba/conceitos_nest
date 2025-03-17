import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  controllers: [PessoasController],
  // Os providers são para uso interno do módulo
  providers: [PessoasService],
  // Quero exportar o serviço da Pessoa para outros módulos da minha aplicação, uso externo
  exports: [PessoasService],
})
export class PessoasModule {}
