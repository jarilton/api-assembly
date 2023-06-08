import { ApiProperty } from '@nestjs/swagger';
import { OpcaoVoto } from './votos.entity';
import { IsNotEmpty, IsIn } from 'class-validator';

export class RegistroVotoResource {
  @IsNotEmpty({
    message: 'CPF é obrigatório',
  })
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({
    message: 'Opção de voto é obrigatória',
  })
  @IsIn([OpcaoVoto.SIM, OpcaoVoto.NAO], {
    message: 'Opção de voto só pode ser SIM ou NAO',
  })
  @ApiProperty({
    example: 'SIM ou NAO',
  })
  opcaoVoto: OpcaoVoto;
}
