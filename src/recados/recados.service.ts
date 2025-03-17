import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  throwNotFoundError() {
    // throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado não encontrado.');
  }

  async findAll() {
    // Precisamos usar async await porque o find nos retorna uma Promise do JavaScript, ou seja, nesse método estou aguardando ele ir
    // na base de dados pegar todos os recados me retornar eles para dentro da minha variável
    // Se retornarmos diretamente a Promise o NestJS resolve ela pra gente e não precisamos usar async await
    // Quando queremos buscar alguma coisa que tem uma relação vou lá no meu método e falo que quero que ele traga as relations
    const recados = await this.recadoRepository.find({
      relations: ['de', 'para'],
      order: {
        id: 'desc', // Do mais recente para o mais antigo
      },
      // Quais campos do relacionamento quero exibir
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    // Para converter uma string em um number em JavaScript é só colocar o sinal de '+' na frente
    // const recado = this.recados.find(item => item.id === id);
    // Isso daqui vai encontrar um recado onde o id é igual ao id que estou recebendo
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) {
      return recado;
    }

    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    // Encontrar a pessoa que está criando o recado
    const de = await this.pessoasService.findOne(deId);
    // Encontrar a pessoa que está recebendo o recado
    const para = await this.pessoasService.findOne(paraId);
    // Porque se eu não achar a pessoa que está enviando e nem a pessoa que está recebendo não preciso continuar a criação
    // de um novo recado

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };

    // Essa função faz duas coisas: ela encontra o valor na base de dados e recebe como segundo parâmetro os campos que quero
    // atualizar
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) {
      return this.throwNotFoundError();
    }

    return this.recadoRepository.remove(recado);
  }
}
