import { Controller, Get } from '@nestjs/common';
import { WithAlias } from '@src/modules/common/http';
import { API_URL_ALIASES_GET } from '@clean-arch/common';
import { DogsListPageService } from './dogs-list.service';

// Обработчик входящего запроса
// Здесь производится преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiDogsListPageController {
    constructor(
        private _dogsListPageService: DogsListPageService
    ){}

    @Get('/dogs')
    @WithAlias(API_URL_ALIASES_GET.PAGE_DOGS_LIST)
    async get(){
        const data = await this._dogsListPageService.get();

        return data;
    }
}
