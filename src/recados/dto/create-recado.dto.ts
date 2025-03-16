import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecadoDto {
  // Geralmente é uma boa prática de programação você colocar um 'readonly' porque você não quer alterar os dados do dto
  // você quer que seja apenas para leitura

  @IsString({
    message: 'texto precisa ser uma string',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  /*@IsNumber()
  @IsBoolean()
  @IsDate()*/
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly de: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly para: string;
}
