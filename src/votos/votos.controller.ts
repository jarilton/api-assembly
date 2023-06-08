import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { VotosService } from './votos.service';
import { PautasService } from 'src/pautas/pautas.service';
import { RegistroVotoResource } from './votos.resource';
import { Response } from 'express';

@Controller('pautas/:id/votos')
export class VotosController {
  constructor(
    private readonly votosService: VotosService,
    private readonly pautasService: PautasService,
  ) {}

  @Post()
  async RegistrarVoto(
    @Param('id') idPauta: string,
    @Body() registroVotoResource: RegistroVotoResource,
    @Res() response: Response,
  ) {
    const pauta = await this.pautasService.findById(idPauta);

    if (!pauta) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(new Error('Pauta não encontrada'));
    }

    const result = await this.votosService.registrarVoto(
      pauta,
      registroVotoResource.cpf,
      registroVotoResource.opcaoVoto,
    );

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
