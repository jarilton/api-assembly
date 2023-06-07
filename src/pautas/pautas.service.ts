import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';
import { Result } from '../common/result';

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) {}

  async save(pauta: Pauta): Promise<Result<Pauta>> {
    const descricao = pauta.descricao;

    const possivelPauta = await this.pautaRepository.findOne({
      where: { descricao: descricao },
    });

    if (possivelPauta) {
      return new Result<Pauta>(
        null,
        new Error('Já existe uma pauta com essa descrição'),
      );
    }

    pauta = await this.pautaRepository.save(pauta);

    return new Result<Pauta>(pauta, null);
  }

  async findAll(): Promise<Pauta[]> {
    return await this.pautaRepository.find();
  }
}
