import { Module } from '@nestjs/common';
import { VotosController } from './votos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votosProviders } from './votos.providers';
import { VotosService } from './votos.service';
import { AssociadosService } from './associados/associados.service';

@Module({
  controllers: [VotosController],
  imports: [DatabaseModule],
  providers: [...votosProviders, VotosService, AssociadosService],
})
export class VotosModule {}
