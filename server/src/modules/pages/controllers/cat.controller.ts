import { Controller, Get, Param, Render, Req } from '@nestjs/common';
import { CatPageService } from '@src/modules/api/pages/cat.service';
import { WithAlias } from '@src/modules/common/http';
import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common/dist';
import { CommonPageService } from '../services/common.service';
import { ClientService } from '../services/client.service';

@Controller()
export class CatPageController {

    constructor(
        private _commonPageService: CommonPageService,
        private _catPageService: CatPageService,
        private _clientService: ClientService
    ) { }

    @Render('index')
    @Get('cats/:id')
    @WithAlias(PAGES_URL_ALIASES.CAT)
    async get(@Req() req, @Param('id') id: string) {
        const [commonData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._catPageService.get(parseInt(id))
        ]);
        
        return this._clientService.getRenderData(
            `/cats/${id}`,
            {
            ...commonData,
            [PAGES_KEYS.CAT]: pageData
        })
    }
}
