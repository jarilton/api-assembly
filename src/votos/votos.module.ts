import { Module } from '@nestjs/common';
import { VotosController } from './votos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { votosProviders } from './votos.providers';

@Module({
  controllers: [VotosController],
  imports: [DatabaseModule],
  providers: [...votosProviders],
})
export class VotosModule {}
