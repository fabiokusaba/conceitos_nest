import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferência de dados
// DTO -> Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  // Encontrar todos os recados
  // /recados
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(/*@Query() pagination: any*/) {
    // const { limit = 10, offset = 0 } = pagination;
    // return `Retorna todos os recados. Limit=${limit}, Offset=${offset}`;
    return this.recadosService.findAll();
  }

  // Encontra um recado
  // /recados/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createBodyDto: CreateRecadoDto) {
    return this.recadosService.create(createBodyDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    // console.log(
    //   updateRecadoDto.constructor.name,
    //   UpdateRecadoDto instanceof UpdateRecadoDto,
    // );
    return this.recadosService.update(id, updateRecadoDto);
  }

  // ParseIntPipe -> convertendo o nosso parâmetro para um tipo inteiro, ou seja, o dado vai passar dentro desse pipe que vai
  // tentar converter esse id para inteiro e vai me retornar um erro caso ele não consiga converter ou o dado convertido
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // console.log(id, typeof id);
    return this.recadosService.remove(id);
  }
}
