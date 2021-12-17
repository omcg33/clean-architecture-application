import { Controller, Get, Render, Req } from '@nestjs/common';
import { DogsListPageService } from '@src/modules/api/pages/dogsList/dogs-list.service';
import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';
import { WithAlias } from '@src/modules/common/http';

@Controller()
export class DogsListPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _dogsListPageService: DogsListPageService,
        private _clientService: ClientService
    ) { }

    @Render('index')
    @Get('dogs')
    @WithAlias(PAGES_URL_ALIASES.DOGS_LIST)
    async get(@Req() req) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._dogsListPageService.get()
        ]);

        return this._clientService.getRenderData(
            '/dogs',
            {
                ...commonData,
                [PAGES_KEYS.DOGS_LIST]: pageData
            }
        )
    }
}
