import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Associados {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  cpf: string;
}
