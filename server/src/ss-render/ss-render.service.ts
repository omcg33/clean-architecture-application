import { Injectable } from '@nestjs/common';

@Injectable()
export class SsRenderService {
    private _pageRoutes;
    private _render;
    
    // private get _render() {
    //     if (typeof this._render !== "function")
    //         throw new Error('SSR error: no render function');

    //     return this._render;
    // }

    // private set _render(render) {
    //     this._render = render;
    // }

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
