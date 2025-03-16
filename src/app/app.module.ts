import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
// import { ConceitosManualModule } from 'src/conceitos-manual/conceitos-manual.module';
// import { ConceitosAutomaticoModule } from 'src/conceitos-automatico/conceitos-automatico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'postgres',
      autoLoadEntities: true, // Carrega entidades sem precisar especificá-las
      synchronize: true, // Sincroniza tudo o que estou fazendo aqui com o banco de dados. Não deve ser usado em produção
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
