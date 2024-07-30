import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { IsCpfCnpj } from 'src/infra/validators/is-cpf-cnpf.validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  @IsCpfCnpj()
  @ApiProperty()
  cpfCnpj: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty()
  farmerName: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty()
  farmName: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty()
  city: string;

  @IsString()
  @MaxLength(2)
  @MinLength(2)
  @ApiProperty()
  state: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  totalAreaHectares: number;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  cultivableAreaHectares: number;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  vegetationAreaHectares: number;

  @IsArray()
  @IsUUID('4', { each: true })
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'uuid',
    },
  })
  crops: string[];
}
