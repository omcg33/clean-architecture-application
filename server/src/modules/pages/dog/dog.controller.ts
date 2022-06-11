import { Request } from 'express';
import { Controller, Get, Param, Render, Req } from '@nestjs/common';
import { DogPageService } from '@src/modules/api/pages/dog/dog.service';
import { WithAlias } from '@src/modules/common/http';

import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../common/common.service';
import { ClientService } from '../helpers/services/client.service';
import { adaptCommonPageDataToCommonInitialState } from '../common/common.adapter';
import { CommonController } from '../common/common.controller';

@Controller()
export class DogPageController extends CommonController {

    constructor(
        private _commonPageService: CommonPageService,
        private _dogPageService: DogPageService,
        private _clientService: ClientService
    ) { 
        super();
    }

    @Render('index')
    @Get('dogs/:id')
    @WithAlias(PAGES_URL_ALIASES.DOG)
    async get(@Req() req: Request, @Param('id') id: string) {
        const [commonPageData, pageData] = await Promise.all([
            this._commonPageService.get(req),
            this._dogPageService.get(parseInt(id))
        ]);
        const { location } = commonPageData;

        return this._clientService.getRenderData(
            location,
            {
            ...adaptCommonPageDataToCommonInitialState(commonPageData),
            [PAGES_KEYS.DOG]: pageData
        })
    }
}
