import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class ClientService {
    private _pageRoutes;
    private _ssr;
    
    setPageRoutes(pageRoutes){
        this._pageRoutes = pageRoutes;
    }

    setSSR(ssr){
        this._ssr = ssr;
    }

    // TODO: Типизировать state
    getRenderData(location: string, initialState: any) {
        return this._ssr({pageRoutes: this._pageRoutes, location, ...initialState});
    }
}
