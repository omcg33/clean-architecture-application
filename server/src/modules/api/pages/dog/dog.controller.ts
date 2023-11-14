import { Controller, Get, Param } from '@nestjs/common';
import { WithAlias } from '@src/modules/common/http';
import { API_URL_ALIASES_GET } from '../../../../../../common';
import { DogPageService } from './dog.service';

// Обработчик входящего запроса
// Здесь производится преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiDogPageController {
  constructor(private _dogPageService: DogPageService) {}

  @Get('/dogs/:id')
  @WithAlias(API_URL_ALIASES_GET.PAGE_DOG)
  async get(@Param('id') id: string) {
    const data = await this._dogPageService.get(parseInt(id));

    return data;
  }
}
