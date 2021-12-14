import { Controller, Get, Param, Render, Req } from '@nestjs/common';
import { DogPageService } from '@src/modules/api/pages/dog.service';
import { WithAlias } from '@src/modules/common/http';
import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common/dist';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';

@Controller()
export class DogPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _dogPageService: DogPageService,
        private _clientService: ClientService
    ) { }

    @Render('index')
    @Get('dogs/:id')
    @WithAlias(PAGES_URL_ALIASES.DOG)
    async get(@Req() req, @Param('id') id: string) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._dogPageService.get(parseInt(id))
        ]);

        return this._clientService.getRenderData(
            `/dogs/${id}`,
            {
            ...commonData,
            [PAGES_KEYS.DOG]: pageData
        })
    }
}
