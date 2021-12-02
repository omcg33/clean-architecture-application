import { Injectable, Scope } from '@nestjs/common';

import { SSRender } from '../../../../../common/dist';

@Injectable({ scope: Scope.DEFAULT })
export class ClientService {
    private _pageRoutes;
    private _ssr: SSRender<any>;
    
    setPageRoutes(pageRoutes){
        this._pageRoutes = pageRoutes;
    }

    setSSR(ssr: SSRender<any>){
        this._ssr = ssr;
    }

    // TODO: Типизировать state
    getRenderData(location: string, initialState: any) {
        return this._ssr({pageRoutes: this._pageRoutes, location, state: initialState});
    }
}
