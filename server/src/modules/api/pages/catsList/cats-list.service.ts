import { Injectable } from '@nestjs/common';
import { CatsGetService } from '../../../../modules/common/cats/get.service';

// Сервис реализует сборку всех нужных данных для конкретной страницы
@Injectable()
export class CatsListPageService {
  constructor(private _getCatsService: CatsGetService) {}

  async get() {
    const [cats] = await Promise.all([this._getCatsService.get()]);

    return {
      cats,
    };
  }
}
