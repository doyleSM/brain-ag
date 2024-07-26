import { ListCropOutputDto } from 'src/application/dto/crop/list-crop-output';
import BaseUseCase from '../base.use-case';
import { UnitOfWork } from 'src/domain/interfaces/unit-of-work';

export class ListCropsUseCase implements BaseUseCase<void, ListCropOutputDto[]> {
  constructor(private uw: UnitOfWork) {}
  async execute(): Promise<ListCropOutputDto[]> {
    try {
      const crops = await this.uw.cropRepository.findAll();
      return crops.map((crop) => {
        return crop.toJson();
      });
    } catch (error) {
      throw error;
    }
  }
}
