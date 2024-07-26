import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { ListCropsUseCase } from 'src/application/usecases/crop/list-crops-use-case';

@Injectable()
@Controller({
  path: 'crops',
})
export class CropController {
  constructor(
    @Inject('LIST_CROP_USE_CASE')
    private readonly listCropsUseCase: ListCropsUseCase,
  ) {}

  @Get('/')
  async list() {
    return this.listCropsUseCase.execute();
  }
}
