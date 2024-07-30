import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { IsCpfCnpj } from 'src/infra/validators/is-cpf-cnpf.validator';

export class UpdateFarmInputDto {
  @IsOptional()
  @IsString()
  @IsCpfCnpj()
  @ApiPropertyOptional({
    type: 'string',
  })
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional({
    type: 'string',
  })
  farmerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional({
    type: 'string',
  })
  farmName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional({
    type: 'string',
  })
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  @MinLength(2)
  @ApiPropertyOptional({
    type: 'string',
  })
  state?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({
    type: 'number',
  })
  totalAreaHectares?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({
    type: 'number',
  })
  cultivableAreaHectares?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({
    type: 'number',
  })
  vegetationAreaHectares?: number;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'uuid',
    },
  })
  crops?: string[];
}
