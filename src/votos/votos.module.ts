import { Module } from '@nestjs/common';
import { VotosController } from './votos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votosProviders } from './votos.providers';
import { VotosService } from './votos.service';
import { AssociadosService } from './associados/associados.service';
import { PautasModule } from 'src/pautas/pautas.module';
import { ResultadoController } from './resultado/resultado.controller';

@Module({
  controllers: [VotosController, ResultadoController],
  imports: [DatabaseModule, PautasModule],
  providers: [...votosProviders, VotosService, AssociadosService],
})
export class VotosModule {}
