import transitionPath from 'router5-transition-path';

export const onRouteActivateMiddleware = (routes) => (router, dependencies) => (toState, fromState, done) => {
    const { toActivate, toDeactivate } = transitionPath(toState, fromState);

    
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