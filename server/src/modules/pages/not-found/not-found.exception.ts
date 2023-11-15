import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { NotFoundPageService } from "@src/modules/api/pages/notFound/not-found.service";

import { PAGES_KEYS } from '@clean-arch/common';
import { adaptCommonPageDataToCommonInitialState } from "../common/common.adapter";
import { CommonPageService } from "../common/common.service";

import { ClientService } from "../helpers/services/client.service";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(
        private _commonPageService: CommonPageService,        
        private _clientService: ClientService,
        private _notFoundPageService: NotFoundPageService,
    ) {}

    async catch(_exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        const [commonPageData, data] = await Promise.all([
            this._commonPageService.get(req),
            this._notFoundPageService.get()
        ]);
        const { location } = commonPageData;
        const location404 = { ...location, state: {...location.state, is404: true }};

        res.render(
            'index',
            this._clientService.getRenderData(
               location404,
                {
                ...adaptCommonPageDataToCommonInitialState({...commonPageData, location: location404 }),
                [PAGES_KEYS.NOT_FOUND]: data
            })
        );
    }
}