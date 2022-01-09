import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { NotFoundPageService } from "@src/modules/api/pages/notFound/not-found.service";

import { PAGES_KEYS } from "../../../../../common";
import { adaptCommonPageDataToCommonInitialState } from "../adapters/common";

import { ClientService } from "../services/client.service";
import { CommonPageService } from "../services/common.service";

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
        const location = '/404';

        res.render(
            'index',
            this._clientService.getRenderData(
               location,
                {
                ...adaptCommonPageDataToCommonInitialState(commonPageData),
                [PAGES_KEYS.NOT_FOUND]: data
            })
        );
    }
}