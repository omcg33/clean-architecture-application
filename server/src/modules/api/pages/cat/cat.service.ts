import { Injectable, NotFoundException } from '@nestjs/common';
import { CatGetService } from '@src/modules/common/cat/get.service';

// Сервис реализует сборку всех нужных данных для конкретной страницы
@Injectable()
export class CatPageService {
  constructor(private _getCatService: CatGetService) {}

  async get(id: number) {
    const [cat] = await Promise.all([this._getCatService.get(id)]);

    if (!cat) throw new NotFoundException(`Cat with id = ${id} not found`);

    return {
      cat,
    };
  }
}
