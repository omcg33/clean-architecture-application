import { Injectable, Scope } from '@nestjs/common';

import { SSRender } from '../../../../../common/dist';

@Injectable({ scope: Scope.DEFAULT })
export class ClientService {
    private _pagesRoutes;
    private _apiRoutes;
    private _ssr: SSRender<any>;
    
    setPagesRoutes(pagesRoutes){
        this._pagesRoutes = pagesRoutes;
    }

    setApiRoutes(apiRoutes){
        this._apiRoutes = apiRoutes;      
    }

    setSSR(ssr: SSRender<any>){
        this._ssr = ssr;
    }

    // TODO: Типизировать state
    getRenderData(location: string, initialState: any) {
        return this._ssr({pagesRoutes: this._pagesRoutes, apiRoutes: this._apiRoutes, location, state: initialState});
    }
}
