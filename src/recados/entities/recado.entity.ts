import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn() // id gerado na base de dados de forma automática
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  texto: string;

  // Pessoa é único, e esse tipo de relação caracteriza uma relação ManyToOne que significa que muitos recados podem estar
  // relacionados com apenas uma pessoa nesse campo 'de' (emissor)
  // Uma pessoa enviou um recado
  @ManyToOne(() => Pessoa)
  // Especificando a coluna 'de' que armazena o ID da pessoa que enviou o recado porque na base de dados não consigo salvar o
  // objeto inteiro Pessoa então tenho que colocar nessa JoinColumn o ID da pessoa que está enviando o recado
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  // Muitos recados podem ser enviados para uma única pessoa (destinatário)
  // Uma outra pessoa recebeu o recado
  @ManyToOne(() => Pessoa)
  // Especifica a coluna 'para' que armazena o ID da pessoa que recebeu o recado
  @JoinColumn({ name: 'para' })
  para: Pessoa;

  @Column({
    default: false,
  })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
