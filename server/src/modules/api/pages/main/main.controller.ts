import { Controller, Get } from '@nestjs/common';
import { WithAlias } from '@src/modules/common/http';
import { API_URL_ALIASES_GET } from '@clean-arch/common';
import { MainPageService } from './main.service';

// Обработчик входящего запроса
// Здесь производится преобразование req в параметры нужные сервису
@Controller('/pages')
export class ApiMainPageController {
    constructor(
        private _mainPageService: MainPageService,
    ){}

    @Get('/main')
    @WithAlias(API_URL_ALIASES_GET.PAGE_MAIN)
    async get(){
        const data = await this._mainPageService.get();

        return data;
    }
}
