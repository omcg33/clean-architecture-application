import { Controller, Get } from '@nestjs/common';
import { CatsListPageService } from './cats-list.service';

// Обработчик входящего запроса
@Controller('/pages')
export class CatsListPageController {
    constructor(
        private _catsListPageService: CatsListPageService
    ){}

    @Get('/cats')
    async get(){
        const data = await this._catsListPageService.get();

        return data;
    }
}
