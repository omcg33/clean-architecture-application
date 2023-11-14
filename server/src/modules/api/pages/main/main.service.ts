import { Injectable } from '@nestjs/common';
import { CatsGetService } from '../../../../modules/common/cats/get.service';
import { DogsGetService } from '../../../../modules/common/dogs/get.service';

@Injectable()
export class MainPageService {
  constructor(
    private _getCatsService: CatsGetService,
    private _getDogsService: DogsGetService,
  ) {}

  async get() {
    const [cats, dogs] = await Promise.all([
      this._getCatsService.get(),
      this._getDogsService.get(),
    ]);

    return {
      cats,
      dogs,
    };
  }
}
