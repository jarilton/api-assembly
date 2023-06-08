import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Votos } from './votos.entity';

@Injectable()
export class VotosService {
  constructor(
    @Inject('VOTOS_REPOSITORY')
    private readonly votoRepository: Repository<Votos>,
  ) {}
}
