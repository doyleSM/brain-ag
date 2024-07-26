import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { CreateFarmUseCase } from 'src/application/usecases/farm/create-farm.use-case';
import { CreateFarmDto } from './dto/create-farm.input.dto';

@Injectable()
@Controller({
  path: 'farms',
})
export class FarmController {
  constructor(
    @Inject('CREATE_FARM_USE_CASE')
    private readonly createFarmUseCase: CreateFarmUseCase,
  ) {}

  @Post('/')
  async create(@Body() createFarmDto: CreateFarmDto) {
    return this.createFarmUseCase.execute(createFarmDto);
  }
}
