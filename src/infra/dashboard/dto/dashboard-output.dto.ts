import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class FarmsCrop {
  @ApiProperty()
  @IsString()
  cropName: string;

  @ApiProperty()
  @IsNumber()
  totalFarms: number;
}

class TotalLandUse {
  @ApiProperty()
  @IsNumber()
  totalCultivableArea: number;

  @ApiProperty()
  @IsNumber()
  totalVegetationArea: number;
}

class TotalFarmsByState {
  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNumber()
  totalFarms: number;
}

export class DashboardOutputDto {
  @IsNumber()
  @ApiProperty()
  totalArea: number;

  @ApiProperty({
    type: FarmsCrop,
    isArray: true,
  })
  totalFarmsByCrop: FarmsCrop[];

  @ApiProperty({
    type: TotalFarmsByState,
    isArray: true,
  })
  totalFarmsByState: TotalFarmsByState[];

  @IsNumber()
  @ApiProperty()
  totalFarms: number;

  @ApiProperty({
    type: TotalLandUse,
  })
  totalLandUse: TotalLandUse;
}
