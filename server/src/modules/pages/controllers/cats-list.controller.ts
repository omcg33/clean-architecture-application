import { Controller, Get, Render, Req } from '@nestjs/common';
import { CatsListPageService } from '@src/modules/api/pages/cats-list.service';
import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';
import { WithAlias } from '@src/modules/common/http';

@Controller()
export class CatsListPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _catsListPageService: CatsListPageService,
        private _clientService: ClientService
    ) { }

    @Render('index')
    @Get('cats')
    @WithAlias(PAGES_URL_ALIASES.CATS_LIST)
    async get(@Req() req) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._catsListPageService.get()
        ]);

        return this._clientService.getRenderData(
            '/cats',
            {
            ...commonData,
            [PAGES_KEYS.CATS_LIST]: pageData
        })
    }
}
