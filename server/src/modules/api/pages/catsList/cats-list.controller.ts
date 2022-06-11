import { Controller, Get } from '@nestjs/common';
import { API_URL_ALIASES_GET } from '../../../../../../common';
import { WithAlias } from '@src/modules/common/http';
import { CatsListPageService } from './cats-list.service';

// Обработчик входящего запроса
// Здесь производится преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiCatsListPageController {
    constructor(
        private _catsListPageService: CatsListPageService
    ){}

    @Get('/cats')
    @WithAlias(API_URL_ALIASES_GET.PAGE_CATS_LIST)
    async get(){
        const data = await this._catsListPageService.get();

        return data;
    }
}
