import { constants, Router } from 'router5';
import transitionPath from 'router5-transition-path';
import { getIs404 } from './helpers';

export const onRouteMiddleware = (routes) => (router: Router, dependencies) => (toState, fromState, done) => {
    const { toActivate, toDeactivate } = transitionPath(toState, fromState);
    const is404 = toState && toState.meta ? getIs404(toState.meta) : false;
    
    if (is404)
        toActivate.push(constants.UNKNOWN_ROUTE);

    toDeactivate.forEach(segment => {
        const routeSegment = routes.find(r => r.name === segment);

        if (routeSegment && routeSegment.onDeactivate) {
            dependencies.store.dispatch(routeSegment.onDeactivate(fromState.params));
        }
    });

    toActivate.forEach(segment => {
        const routeSegment = routes.find(r => r.name === segment);

        if (routeSegment && routeSegment.onActivate) {
            dependencies.store.dispatch(routeSegment.onActivate(toState.params));
        }
    });

    done();
};