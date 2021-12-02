import { Controller, Get, Render, Req } from '@nestjs/common';
import { DogsListPageService } from '@src/api/pages/dogs-list.service';
import { PAGES_KEYS } from '../../../common';
import { CommonPageService } from './common.service';
import { RenderService } from './render.service';

@Controller()
export class DogsListPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _dogsListPageService: DogsListPageService,
        private _render: RenderService
    ) { }

    @Render('index')
    @Get('dogs')
    async get(@Req() req) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._dogsListPageService.get()
        ]);

        return this._render.render({
            location: '/dogs',
            state: {
                ...commonData,
                [PAGES_KEYS.DOGS_LIST]: pageData
            } 
        })
    }
}
