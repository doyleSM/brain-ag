import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ListCropOutputDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;
}
