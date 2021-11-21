import { Injectable } from '@nestjs/common';

@Injectable()
export class RenderService {
    private _pageRoutes;
    private _render;
    
    setPageRoutes(pageRoutes){
        this._pageRoutes = pageRoutes;
    }

    setRender(render){
        this._render = render;
    }

    render({ location, ...preloadedState}) {
        return this._render({pageRoutes: this._pageRoutes, location, ...preloadedState});
    }
}
