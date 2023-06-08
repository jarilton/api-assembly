import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { VotosService } from '../votos.service';
import { Response } from 'express';
import { PautasService } from 'src/pautas/pautas.service';

@Controller('pautas/:id/resultados')
export class ResultadoController {
  constructor(
    private readonly votoService: VotosService,
    private readonly pautaService: PautasService,
  ) {}

  @Get()
  async obterResultado(
    @Param('id') idPauta: string,
    @Res() response: Response,
  ) {
    const pauta = await this.pautaService.findById(idPauta);

    if (!pauta) {
      return response.status(HttpStatus.NOT_FOUND).send('Pauta não encontrada');
    }

    const resultado = await this.votoService.obterResultado(pauta);

    if (resultado.isError) {
      return response
        .status(resultado.error.status)
        .send(resultado.error.message);
    }

    return response.status(HttpStatus.OK).send(resultado.value);
  }
}
