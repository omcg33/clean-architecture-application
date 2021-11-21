import { Controller, Get } from '@nestjs/common';
import { MainPageService } from './main.service';

// Обработчик входящего запроса
// Здесь производиться преобразование req в параметры нужные сервису
@Controller('/pages')
export class MainPageController {
    constructor(
        private _mainPageService: MainPageService,
    ){}

    @Get('/main')
    async get(){
        const data = await this._mainPageService.get();

        return data;
    }
}
