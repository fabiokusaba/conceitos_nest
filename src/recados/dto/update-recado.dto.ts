import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  // Indicando que cada uma das chaves é opcional o envio delas com a utilização do '?'
  // readonly texto?: string;
  // readonly de?: string;
  // readonly para?: string;

  // Sobrescrevendo o campo e tornando ele obrigatório
  // @IsNotEmpty()
  // @MinLength(5)
  // @MaxLength(255)
  // readonly texto: string;

  // Adicionando um campo novo, exemplo: campo lido
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;
}
