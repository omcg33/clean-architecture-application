import { Controller, Get, Render, Req } from '@nestjs/common';
import { MainPageService } from 'api/pages/main.service';
import { PAGES_KEYS } from 'consts/pages';
import { CommonPageService } from './common.service';
import { RenderService } from './render.service';

@Controller()
export class MainPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _mainPageService: MainPageService,
        private _render: RenderService
    ) { }

    @Render('index')
    @Get('/')
    async get(@Req() req) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._mainPageService.get(),
        ]);

        return this._render.render({
            location: '/',
            state: {
                ...commonData,
                [PAGES_KEYS.MAIN]: pageData
            }
        })
    }
}
