import { Controller, Get, Render, Req } from '@nestjs/common';
import { CatsListPageService } from '@src/api/pages/cats-list.service';
import { PAGES_KEYS } from '../../../common';
import { CommonPageService } from './common.service';
import { RenderService } from './render.service';

@Controller()
export class CatsListPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _catsListPageService: CatsListPageService,
        private _render: RenderService
    ) { }

    @Render('index')
    @Get('cats')
    async get(@Req() req) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._catsListPageService.get()
        ]);

        return this._render.render({
            location: '/cats',
            state: {
                ...commonData,
                [PAGES_KEYS.CATS_LIST]: pageData
            }
        })
    }
}
