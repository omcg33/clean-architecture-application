import { Controller, Get } from '@nestjs/common';
import { DogsListPageService } from './dogs-list.service';

// Обработчик входящего запроса
@Controller('/pages')
export class DogsListPageController {
    constructor(
        private _dogsListPageService: DogsListPageService
    ){}

    @Get('/dogs')
    async get(){
        const data = await this._dogsListPageService.get();

        return data;
    }
}
