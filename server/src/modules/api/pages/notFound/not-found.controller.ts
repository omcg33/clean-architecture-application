import { Controller, Get } from '@nestjs/common';
import { WithAlias } from '../../../../modules/common/http';
import { API_URL_ALIASES_GET } from '../../../../../../common';
import { NotFoundPageService } from './not-found.service';

// Обработчик входящего запроса
// Здесь производится преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiNotFoundPageController {
  constructor(private _notFoundPageService: NotFoundPageService) {}

  @Get('/not-found')
  @WithAlias(API_URL_ALIASES_GET.PAGE_NOT_FOUND)
  async get() {
    const data = await this._notFoundPageService.get();

    return data;
  }
}
