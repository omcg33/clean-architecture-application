import { Injectable, Scope } from '@nestjs/common';

import { ILocation, SSRender } from '../../../../../../common';

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
    getRenderData(location: ILocation, initialState: any) {
        return this._ssr({pagesRoutes: this._pagesRoutes, apiRoutes: this._apiRoutes, state: initialState, location });
    }
}
