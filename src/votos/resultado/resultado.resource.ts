import { OpcaoVoto } from '../votos.entity';

export class ResultadoVotacaoResource {
  pauta: string;
  abertura: Date;
  encerramento: Date;
  totalVotos: number;
  quantidadeSim: number;
  quantidadeNao: number;
  opcaoGanhadora: OpcaoVoto;
}
