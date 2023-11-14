import { Injectable } from '@nestjs/common';
import { DogsGetService } from '../../../../modules/common/dogs/get.service';

// Сервис реализует сборку всех нужных данных для конкретной страницы
@Injectable()
export class DogsListPageService {
  constructor(private _getDogsService: DogsGetService) {}

  async get() {
    const [dogs] = await Promise.all([this._getDogsService.get()]);

    return {
      dogs,
    };
  }
}
