import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCropsUseCase } from 'src/application/usecases/crop/list-crops-use-case';
import { ListCropOutputDto } from './dto/list-crop-output.dto';

@Controller({
  path: 'crops',
})
@ApiTags('Crop')
export class CropController {
  constructor(
    @Inject('LIST_CROP_USE_CASE')
    private readonly listCropsUseCase: ListCropsUseCase,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'List crops registered' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 422, description: 'Unprocessable Entity.' })
  @ApiResponse({ status: 200, description: 'Success.', type: ListCropOutputDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async list() {
    return this.listCropsUseCase.execute();
  }
}
