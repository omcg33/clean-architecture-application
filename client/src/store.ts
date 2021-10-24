import { applyMiddleware, compose, createStore, Reducer, Store }                   from "redux";
import createSagaMiddleware, { Saga, SagaMiddleware, SagaMiddlewareOptions, Task } from "redux-saga";
import { fromJS }                                                                  from "immutable";

import initialSaga from "./app/sagas/sagasRunner";

let params: SagaMiddlewareOptions;

if (
	typeof window === 'object' &&
	(<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
	process.env.NODE_ENV !== 'production' // eslint-disable-line
) {
	const monitor = (<any>window).__SAGA_MONITOR_EXTENSION__;
	params = { sagaMonitor: monitor };
}


export default function(
	rootReducer: Reducer,
	rootSaga?: Saga<any>,
	initialState: any = {},
	middlewares: any[] = []
): [Store, Task | null, SagaMiddleware<Object>] {
    // Передать данные в хром плагин для дебага
	// https://github.com/zalmoxisus/redux-devtools-extension
	let composeEnhancers = compose;
	// Создать мидлвар саги
	const sagaMiddleware = createSagaMiddleware(params);

	if (
		typeof window === "object" &&
		(<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		process.env.NODE_ENV !== "production" // eslint-disable-line
	) {
		composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
	}

	let state: any = {};

	if (initialState) {
    fromJS(initialState).map(
			(stateValue: any, stateName: string) => {
				state[stateName] = stateValue;
			}
		);
	}

	// Создать store для конструктора
    const store = createStore(
        rootReducer,
        state,
        // Если переданы энхансеры, то применить их ДО мидлваров
        // Мидлвары применить ПАРАЛЛЕЛЬНО в качестве самого последнего энхансера
        composeEnhancers(
            ...([] as Array<any>)
                .concat([
                        applyMiddleware(
                            ...[sagaMiddleware].concat(middlewares)
                        )
                    ]
                )
        )
    );

	let task: Task | null = null;

	if (rootSaga) {
		task = sagaMiddleware.run(initialSaga(rootSaga));
	}

	return [store, task, sagaMiddleware];
}
