import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';

import { CatsListPageService } from '@src/modules/api/pages/catsList/cats-list.service';
import { WithAlias } from '@src/modules/common/http';

import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';
import { adaptCommonPageDataToCommonInitialState } from '../adapters/common';

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
    async get(@Req() req: Request) {
        const [commonPageData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._catsListPageService.get()
        ]);
        const { location } = commonPageData;
        
        return this._clientService.getRenderData(
            location,
            {
            ...adaptCommonPageDataToCommonInitialState(commonPageData),
            [PAGES_KEYS.CATS_LIST]: pageData
        })
    }
}
