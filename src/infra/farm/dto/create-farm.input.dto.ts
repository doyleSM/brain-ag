import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { IsCpfCnpj } from 'src/infra/validators/is-cpf-cnpf.validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  @IsCpfCnpj()
  cpfCnpj: string;

  @IsString()
  @MaxLength(100)
  farmerName: string;

  @IsString()
  @MaxLength(100)
  farmName: string;

  @IsString()
  @MaxLength(100)
  city: string;

  @IsString()
  @MaxLength(2)
  @MinLength(2)
  state: string;

  @IsNumber()
  @Min(0)
  totalAreaHectares: number;

  @IsNumber()
  @Min(0)
  cultivableAreaHectares: number;

  @IsNumber()
  @Min(0)
  vegetationAreaHectares: number;

  @IsArray()
  @IsUUID('4', { each: true })
  crops: string[];
}
