import { Pauta } from 'src/pautas/pauta.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Associados } from './associados/associados.entity';

@Entity()
export class Votos {
  @PrimaryGeneratedColumn()
  id?: string;

  @ManyToOne(() => Pauta)
  @JoinColumn({ name: 'id_pauta' })
  pauta: Pauta;

  @ManyToOne(() => Associados)
  @JoinColumn({ name: 'id_associado' })
  associado: Associados;

  @Column({ name: 'voto' })
  opcaoVoto: OpcaoVoto;
}

export enum OpcaoVoto {
  SIM = 'SIM',
  NAO = 'NAO',
}
