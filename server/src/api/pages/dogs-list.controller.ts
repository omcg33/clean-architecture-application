import { Controller, Get } from '@nestjs/common';
import { DogsListPageService } from './dogs-list.service';

// Обработчик входящего запроса
// Здесь производиться преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiDogsListPageController {
    constructor(
        private _dogsListPageService: DogsListPageService
    ){}

    @Get('/dogs')
    async get(){
        const data = await this._dogsListPageService.get();

        return data;
    }
}
