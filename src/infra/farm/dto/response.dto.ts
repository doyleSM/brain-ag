import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

class CropRes {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;
}

class FarmerRes {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    type: 'string',
  })
  cpfCnpj: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;
}

export class FarmResponseDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  city: string;

  @ApiProperty({
    type: 'string',
  })
  state: string;

  @ApiProperty({
    type: 'number',
  })
  totalAreaHectares: number;

  @ApiProperty({
    type: 'number',
  })
  cultivableAreaHectares: number;

  @ApiProperty({
    type: 'number',
  })
  vegetationAreaHectares: number;

  @ApiProperty({
    type: CropRes,
    isArray: true,
  })
  crops: CropRes[];

  @ApiProperty({
    type: FarmerRes,
  })
  farmer: FarmerRes;
}
