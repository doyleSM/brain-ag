import { IsArray, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { IsCpfCnpj } from 'src/infra/validators/is-cpf-cnpf.validator';

export class UpdateFarmInputDto {
  @IsOptional()
  @IsString()
  @IsCpfCnpj()
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  farmerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  farmName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  @MinLength(2)
  state?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAreaHectares?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cultivableAreaHectares?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  vegetationAreaHectares?: number;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  crops?: string[];
}
