import { Request } from 'express';
import { Controller, Get, Render, Req } from '@nestjs/common';

import { WithAlias } from '@src/modules/common/http';
import { MainPageService } from '@src/modules/api/pages/main/main.service';

import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../common/common.service';
import { ClientService } from '../helpers/services/client.service';
import { adaptCommonPageDataToCommonInitialState } from '../common/common.adapter';

@Controller()
export class MainPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _mainPageService: MainPageService,
        private _clientService: ClientService
    ) { }

    @Render('index')
    @Get('/')
    @WithAlias(PAGES_URL_ALIASES.MAIN)
    async get(@Req() req: Request) {
        const [commonPageData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._mainPageService.get(),
        ]);
        const { location } = commonPageData;

        return this._clientService.getRenderData(
            location,
            {
                ...adaptCommonPageDataToCommonInitialState(commonPageData),
                [PAGES_KEYS.MAIN]: pageData
            }
        )
    }
}
