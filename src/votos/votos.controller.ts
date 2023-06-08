import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { VotosService } from './votos.service';
import { PautasService } from 'src/pautas/pautas.service';
import { RegistroVotoResource } from './votos.resource';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('pautas/:id/votos')
@ApiTags('Votos')
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

    if (result.isError) {
      const error = result.error;
      return response.status(error.status).send(error.message);
    }

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
