import { Body, Controller, Delete, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateFarmUseCase } from 'src/application/usecases/farm/create-farm.use-case';
import { CreateFarmDto } from './dto/create-farm.input.dto';
import { UpdateFarmInputDto } from './dto/update-farm.input.dto';
import { UpdateFarmUseCase } from 'src/application/usecases/farm/update-farm.use-case';
import { DeleteFarmUseCase } from 'src/application/usecases/farm/delete-farm-use-case';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FarmResponseDto } from './dto/response.dto';

@ApiTags('Farm')
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
  @ApiOperation({ summary: 'Create Farm' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.' })
  @ApiResponse({ status: 201, description: 'Success.', type: FarmResponseDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiOkResponse({ type: FarmResponseDto, isArray: true, status: 201 })
  async create(@Body() createFarmDto: CreateFarmDto) {
    return this.createFarmUseCase.execute(createFarmDto);
  }

  @Patch('/:farmId')
  @ApiOperation({ summary: 'Update Farm' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.' })
  @ApiResponse({ status: 200, description: 'Success.', type: FarmResponseDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiOkResponse({ type: FarmResponseDto, isArray: true, status: 200 })
  async update(@Param('farmId') farmId: string, @Body() updateFarmInputDto: UpdateFarmInputDto) {
    return this.updateFarmUseCase.execute({
      farmId,
      input: updateFarmInputDto,
    });
  }

  @Delete('/:farmId')
  @ApiOperation({ summary: 'Delete Farm' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.' })
  @ApiResponse({ status: 204, description: 'Success.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async delete(@Param('farmId') farmId: string) {
    return this.deleteFarmUseCase.execute({
      farmId,
    });
  }
}
