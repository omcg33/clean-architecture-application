import { Controller, Get, Render, Req } from '@nestjs/common';
import { DogsListPageService } from '@src/modules/api/pages/dogs-list.service';
import { PAGES_KEYS } from '../../../../../common';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';

@Controller()
export class DogsListPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _dogsListPageService: DogsListPageService,
        private _clientService: ClientService
    ) { }

    @Render('index')
    @Get('dogs')
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
