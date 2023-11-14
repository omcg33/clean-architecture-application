import { Injectable, NotFoundException } from '@nestjs/common';
import { DogGetService } from '@src/modules/common/dog/get.service';

// Сервис реализует сборку всех нужных данных для конкретной страницы
@Injectable()
export class DogPageService {
  constructor(private _getDogService: DogGetService) {}

  async get(id: number) {
    const [dog] = await Promise.all([this._getDogService.get(id)]);

    if (!dog) throw new NotFoundException(`Dog with id = ${id} not found`);

    return {
      dog,
    };
  }
}
