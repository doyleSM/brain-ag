import { Controller, Get, Inject } from '@nestjs/common';
import { GetTotalAreaUseCase } from 'src/application/usecases/dashboard/get-total-area.use-case';
import { GetTotalFarmsByCropUseCase } from 'src/application/usecases/dashboard/get-total-farms-by-crop.use-case';
import { GetTotalFarmsByStateUseCase } from 'src/application/usecases/dashboard/get-total-farms-by-state.use-case';
import { GetTotalFarmsUseCase } from 'src/application/usecases/dashboard/get-total-farms.use-case';
import { GetTotalLandUseUseCase } from 'src/application/usecases/dashboard/get-total-land-use.use-case';

@Controller({
  path: 'dashboard',
})
export class DashboardController {
  constructor(
    @Inject('GET_TOTAL_AREA_USE_CASE')
    private readonly getTotalAreaUseCase: GetTotalAreaUseCase,

    @Inject('GET_TOTAL_FARMS_BY_CROP_USE_CASE')
    private readonly getTotalFarmsByCropUseCase: GetTotalFarmsByCropUseCase,

    @Inject('GET_TOTAL_FARMS_BY_STATE_USE_CASE')
    private readonly getTotalFarmsByStateUseCase: GetTotalFarmsByStateUseCase,

    @Inject('GET_TOTAL_FARMS_USE_CASE')
    private readonly getTotalFarmsUseCase: GetTotalFarmsUseCase,

    @Inject('GET_TOTAL_LAND_USE_USE_CASE')
    private readonly getTotalLandUseUseCase: GetTotalLandUseUseCase,
  ) {}

  @Get('/')
  async nested() {
    const totalArea = await this.getTotalAreaUseCase.execute();
    const totalFarmsByCrop = await this.getTotalFarmsByCropUseCase.execute();
    const totalFarmsByState = await this.getTotalFarmsByStateUseCase.execute();
    const totalFarms = await this.getTotalFarmsUseCase.execute();
    const totalLandUse = await this.getTotalLandUseUseCase.execute();
    return {
      ...totalArea,
      totalFarmsByCrop,
      totalFarmsByState,
      ...totalFarms,
      totalLandUse,
    };
  }
}
