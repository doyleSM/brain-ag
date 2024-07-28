import { Crop } from './crop';

describe('Crop', () => {
  it('should create a Crop', async () => {
    const crop = new Crop('corn', 'fe965a29-032a-4272-ad96-6d4bd6acd4c6');
    expect(crop.toJson()).toEqual({
      name: 'corn',
      id: 'fe965a29-032a-4272-ad96-6d4bd6acd4c6',
    });
  });
});
