import { Controller, Get } from '@nestjs/common';
// import { PAGES_URL_ALIASES } from '../../../../common/src';
// import { WithAlias } from '@src/common/http';
import { CatsListPageService } from './cats-list.service';

// Обработчик входящего запроса
// Здесь производиться преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiCatsListPageController {
    constructor(
        private _catsListPageService: CatsListPageService
    ){}

    @Get('/cats')
    // @WithAlias(PAGES_URL_ALIASES.CATS_LIST)
    async get(){
        const data = await this._catsListPageService.get();

        return data;
    }
}
