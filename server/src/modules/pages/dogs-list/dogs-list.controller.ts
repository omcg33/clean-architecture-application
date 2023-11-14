import { Request } from 'express';
import { Controller, Get, Render, Req } from '@nestjs/common';
import { WithAlias } from '../../../modules/common/http';
import { DogsListPageService } from '../../../modules/api/pages/dogsList/dogs-list.service';

import { PAGES_KEYS, PAGES_URL_ALIASES } from '../../../../../common';
import { CommonPageService } from '../common/common.service';
import { ClientService } from '../helpers/services/client.service';
import { adaptCommonPageDataToCommonInitialState } from '../common/common.adapter';

@Controller()
export class DogsListPageController {
  constructor(
    private _commonPageService: CommonPageService,
    private _dogsListPageService: DogsListPageService,
    private _clientService: ClientService,
  ) {}

  @Render('index')
  @Get('dogs')
  @WithAlias(PAGES_URL_ALIASES.DOGS_LIST)
  async get(@Req() req: Request) {
    const [commonPageData, pageData] = await Promise.all([
      this._commonPageService.get(req),
      this._dogsListPageService.get(),
    ]);
    const { location } = commonPageData;

    return this._clientService.getRenderData(location, {
      ...adaptCommonPageDataToCommonInitialState(commonPageData),
      [PAGES_KEYS.DOGS_LIST]: pageData,
    });
  }
}
