import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associados } from './associados.entity';

@Injectable()
export class AssociadosService {
  constructor(
    @Inject('ASSOCIADOS_REPOSITORY')
    private readonly associadoRepository: Repository<Associados>,
  ) {}
}
