import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Pauta {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  descricao: string;

  @CreateDateColumn({
    name: 'data_cadastro',
  })
  dataCadastro?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  abertura?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  fechamento?: Date;

  obterStatus(): string {
    if (!this.abertura) {
      return 'Não aberta';
    }

    if (!this.fechamento) {
      return 'Aberta';
    }

    return 'Fechada';
  }
}
