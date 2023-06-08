import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Votos } from './votos.entity';
import { Associados } from './associados/associados.entity';

const votosRepository: Provider<Repository<Votos>> = {
  provide: 'VOTOS_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Votos),
  inject: ['DATA_SOURCE'],
};

const associadosRepository: Provider<Repository<Associados>> = {
  provide: 'ASSOCIADOS_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Associados),
  inject: ['DATA_SOURCE'],
};

export const votosProviders: Provider[] = [
  votosRepository,
  associadosRepository,
];
