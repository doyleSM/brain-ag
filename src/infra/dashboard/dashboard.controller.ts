import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTotalAreaUseCase } from 'src/application/usecases/dashboard/get-total-area.use-case';
import { GetTotalFarmsByCropUseCase } from 'src/application/usecases/dashboard/get-total-farms-by-crop.use-case';
import { GetTotalFarmsByStateUseCase } from 'src/application/usecases/dashboard/get-total-farms-by-state.use-case';
import { GetTotalFarmsUseCase } from 'src/application/usecases/dashboard/get-total-farms.use-case';
import { GetTotalLandUseUseCase } from 'src/application/usecases/dashboard/get-total-land-use.use-case';
import { DashboardOutputDto } from './dto/dashboard-output.dto';

@Controller({
  path: 'dashboard',
})
@ApiTags('Dashboard')
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
  @ApiOperation({
    summary: 'Consolidated data for dashboard generation',
  })
  @ApiResponse({ status: 200, description: 'Success.', type: DashboardOutputDto, isArray: true })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async nested() {
    const [totalArea, totalFarmsByCrop, totalFarmsByState, totalFarms, totalLandUse] = await Promise.all([
      this.getTotalAreaUseCase.execute(),
      this.getTotalFarmsByCropUseCase.execute(),
      this.getTotalFarmsByStateUseCase.execute(),
      this.getTotalFarmsUseCase.execute(),
      this.getTotalLandUseUseCase.execute(),
    ]);
    return {
      ...totalArea,
      totalFarmsByCrop,
      totalFarmsByState,
      ...totalFarms,
      totalLandUse,
    };
  }
}
