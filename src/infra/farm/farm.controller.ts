import { Body, Controller, Delete, Inject, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CreateFarmUseCase } from 'src/application/usecases/farm/create-farm.use-case';
import { CreateFarmDto } from './dto/create-farm.input.dto';
import { UpdateFarmInputDto } from './dto/update-farm.input.dto';
import { UpdateFarmUseCase } from 'src/application/usecases/farm/update-farm.use-case';
import { DeleteFarmUseCase } from 'src/application/usecases/farm/delete-farm-use-case';

@Injectable()
@Controller({
  path: 'farms',
})
export class FarmController {
  constructor(
    @Inject('CREATE_FARM_USE_CASE')
    private readonly createFarmUseCase: CreateFarmUseCase,

    @Inject('UPDATE_FARM_USE_CASE')
    private readonly updateFarmUseCase: UpdateFarmUseCase,

    @Inject('DELETE_FARM_USE_CASE')
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
  ) {}

  @Post('/')
  async create(@Body() createFarmDto: CreateFarmDto) {
    return this.createFarmUseCase.execute(createFarmDto);
  }

  @Patch('/:farmId')
  async update(@Param('farmId') farmId: string, @Body() updateFarmInputDto: UpdateFarmInputDto) {
    return this.updateFarmUseCase.execute({
      farmId,
      input: updateFarmInputDto,
    });
  }

  @Delete('/:farmId')
  async delete(@Param('farmId') farmId: string) {
    return this.deleteFarmUseCase.execute({
      farmId,
    });
  }
}
