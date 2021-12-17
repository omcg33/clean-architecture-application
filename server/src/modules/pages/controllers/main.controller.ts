import { Controller, Get, Render, Req } from '@nestjs/common';
import { MainPageService } from '@src/modules/api/pages/main/main.service';
import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';
import { WithAlias } from '@src/modules/common/http';

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
    async get(@Req() req) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._mainPageService.get(),
        ]);

        return this._clientService.getRenderData(
            '/',
            {
                ...commonData,
                [PAGES_KEYS.MAIN]: pageData
            }
        )
    }
}
