import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associados } from './associados.entity';

@Injectable()
export class AssociadosService {
  constructor(
    @Inject('ASSOCIADOS_REPOSITORY')
    private readonly associadoRepository: Repository<Associados>,
  ) {}

  async obterPorCpf(cpf: string): Promise<Associados> {
    return await this.associadoRepository.findOne({
      where: {
        cpf: cpf,
      },
    });
  }

  async recuperarOuCadastrar(cpf: string): Promise<Associados> {
    const associado: Associados = await this.obterPorCpf(cpf);

    if (associado) {
      return associado;
    }

    const novoAssociado = new Associados();
    novoAssociado.cpf = cpf;

    await this.associadoRepository.save(novoAssociado);

    return novoAssociado;
  }
}
