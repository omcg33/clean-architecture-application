import { Controller, Get, Param } from '@nestjs/common';
import { WithAlias } from '@src/modules/common/http';

import { API_URL_ALIASES_GET } from '../../../../../../common';
import { CatPageService } from './cat.service';

// Обработчик входящего запроса
// Здесь производится преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiCatPageController {
  constructor(private _catPageService: CatPageService) {}

  @Get('/cats/:id')
  @WithAlias(API_URL_ALIASES_GET.PAGE_CAT)
  async get(@Param('id') id: string) {
    const data = await this._catPageService.get(parseInt(id));

    return data;
  }
}
