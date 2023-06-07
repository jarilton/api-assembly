import { Controller, Body, Res, Post, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import {
  CriarPautaResource,
  toDomain,
  toRepresentation,
} from './pautas.resource';
import { Pauta } from './pauta.entity';
import { ErrorResource } from 'src/common/erro.resource';

@Controller('pautas')
export class PautasController {
  constructor(private readonly service: PautasService) {}

  @Post()
  async save(@Body() pauta: CriarPautaResource, @Res() response: Response) {
    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.service.save(pautaDomain);

    if (result.isError()) {
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResource(result.error.message));
    }

    return response
      .status(HttpStatus.CREATED)
      .send(toRepresentation(result.value));
  }
}
