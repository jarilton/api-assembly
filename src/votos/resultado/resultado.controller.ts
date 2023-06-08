import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { VotosService } from '../votos.service';
import { Response } from 'express';

@Controller('pautas/:id/resultados')
export class ResultadoController {
  constructor(private readonly votoService: VotosService) {}

  @Get()
  async obterResultado(
    @Param('id') idPauta: string,
    @Res() response: Response,
  ) {
    return response.status(HttpStatus.OK).send();
  }
}
