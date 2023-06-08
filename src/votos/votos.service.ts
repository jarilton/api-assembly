import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OpcaoVoto, Votos } from './votos.entity';
import { AssociadosService } from './associados/associados.service';
import { Pauta } from 'src/pautas/pauta.entity';
import { Result } from 'src/common/result';
import { Associados } from './associados/associados.entity';
import { HttpError } from 'src/common/httpError';
import { ResultadoVotacaoResource } from './resultado/resultado.resource';

@Injectable()
export class VotosService {
  constructor(
    @Inject('VOTOS_REPOSITORY')
    private readonly votoRepository: Repository<Votos>,
    private readonly associadosService: AssociadosService,
  ) {}

  async registrarVoto(
    pauta: Pauta,
    cpf: string,
    opcaoVoto: OpcaoVoto,
  ): Promise<Result<Votos, HttpError>> {
    if (!pauta.isFoiIniciada()) {
      return new Result(
        null,
        new HttpError(
          'Pauta não foi iniciada',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );
    }

    const associado = await this.associadosService.recuperarOuCadastrar(cpf);

    const votoRegistrado: boolean = await this.existeVotoRegistrado(
      pauta,
      associado,
    );

    if (votoRegistrado) {
      return new Result(
        null,
        new HttpError('Voto já registrado', HttpStatus.CONFLICT),
      );
    }

    const voto = new Votos();
    voto.pauta = pauta;
    voto.associado = associado;
    voto.opcaoVoto = opcaoVoto;

    await this.votoRepository.save(voto);
    return new Result(voto, null);
  }

  async existeVotoRegistrado(
    pauta: Pauta,
    associado: Associados,
  ): Promise<boolean> {
    const votos: Votos = await this.votoRepository.findOne({
      where: {
        pauta: {
          id: pauta.id,
        },
        associado: {
          id: associado.id,
        },
      },
    });

    return !!votos;
  }

  async obterVotosPorPauta(pauta: Pauta): Promise<Votos[]> {
    return await this.votoRepository.find({
      where: {
        pauta: {
          id: pauta.id,
        },
      },
    });
  }

  obterPosicaoVencedora(sim: number, nao: number): OpcaoVoto {
    if (sim === nao) {
      return null;
    }

    return sim > nao ? OpcaoVoto.SIM : OpcaoVoto.NAO;
  }

  async obterResultado(
    pauta: Pauta,
  ): Promise<Result<ResultadoVotacaoResource, HttpError>> {
    if (!pauta.isFoiEncerrada()) {
      return new Result(
        null,
        new HttpError(
          'Resultado não pode ser obtido, pois a pauta não foi encerrada',
          HttpStatus.NOT_FOUND,
        ),
      );
    }

    const votos: Votos[] = await this.obterVotosPorPauta(pauta);

    const qtdSim = votos.filter(
      (voto) => voto.opcaoVoto === OpcaoVoto.SIM,
    ).length;

    const qtdNao = votos.filter(
      (voto) => voto.opcaoVoto === OpcaoVoto.NAO,
    ).length;

    const obterPosicaoVencedora = this.obterPosicaoVencedora(qtdSim, qtdNao);

    const resultado = new ResultadoVotacaoResource();
    resultado.pauta = pauta.descricao;
    resultado.abertura = pauta.abertura;
    resultado.encerramento = pauta.fechamento;
    resultado.totalVotos = votos.length;
    resultado.quantidadeSim = qtdSim;
    resultado.quantidadeNao = qtdNao;
    resultado.opcaoGanhadora = obterPosicaoVencedora;

    return new Result(resultado, null);
  }
}
