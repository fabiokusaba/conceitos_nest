import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 100 })
  nome: string;

  // Estabelecendo a relação inversa entre Pessoa e Recado
  // Uma pessoa pode enviar vários recados (ID atrelado em 'de')
  // Esses recados são relacionados ao campo 'de' na entidade Recado
  @OneToMany(() => Recado, recado => recado.de)
  recadosEnviados: Recado[];

  // Uma pessoa pode receber vários recados (ID atrelado em 'para')
  // Esses recados são relacionados ao campo 'para' na entidade Recado
  @OneToMany(() => Recado, recado => recado.para)
  recadosRecebidos: Recado[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
