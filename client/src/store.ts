import { applyMiddleware, combineReducers, compose, createStore, Middleware, Reducer, Store }  from "redux";
import createSagaMiddleware, { Saga, SagaMiddleware, Task } from "redux-saga";

import { fromJS }         from "./libs/immutable";
import initialSaga        from "./app/sagas/sagasRunner";
import { staticReducers } from "./app/reducers";

function createReducerManager(initialReducers) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };
  // Create the initial combinedReducer
  let combinedReducer = combineReducers<any, any>(reducers);
  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: string[] = [];
  return {
    getReducerMap: () => reducers,
    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }
      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },
    // Adds a new reducer with the specified key
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      // Add the reducer to the reducer mapping
      reducers[key] = reducer;
      // Generate a new combined reducer
      combinedReducer = combineReducers<any, any>(reducers);
    },
    // Removes a reducer with the specified key
    remove: key => {
      if (!key || !reducers[key]) {
        return;
      }
      // Remove it from the reducer mapping
      delete reducers[key];
      // Add the key to the list of keys to clean up
      keysToRemove.push(key);
      // Generate a new combined reducer
      combinedReducer = combineReducers<any, any>(reducers);
    },
    // Replaces a reducer with the specified key
    replace: (key, reducer) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;
      // Generate a new combined reducer
      combinedReducer = combineReducers<any, any>(reducers);
    }
  };
}

export default function(
  rootReducer: {[key: string]: Reducer} = {},
  rootSaga?: Saga<any>,
  initialState: any = {},
  middlewares: Middleware<any, any, any>[] = []
): [Store, Task | null, SagaMiddleware<Object>] {
  // Передать данные в хром плагин для дебага
  // https://github.com/zalmoxisus/redux-devtools-extension
 
  const isSagaMonitorEnabled = typeof window !== "undefined" && process.env.NODE_ENV !== "production" && window.__SAGA_MONITOR_EXTENSION__;
  const isReduxDevtoolsEnabled = typeof window !== "undefined" && process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  
  // TODO: Переделать на полньстью immutable
  const state = {};
  if (initialState) {
    fromJS(initialState).map(
      (stateValue: any, stateName: string) => {
        state[stateName] = stateValue;
      }
    );
  }

  const composeEnhancers = isReduxDevtoolsEnabled ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;  
  const sagaMiddleware = createSagaMiddleware({
    ...(isSagaMonitorEnabled ? { sagaMonitor: window.__SAGA_MONITOR_EXTENSION__ } : {})
  });
  const reducerManager = createReducerManager({
    ...staticReducers,
    ...rootReducer
  });

  // Создать store для конструктора
  const store = createStore(
    reducerManager.reduce,
    state,
    // Если переданы энхансеры, то применить их ДО мидлваров
    // Мидлвары применить ПАРАЛЛЕЛЬНО в качестве самого последнего энхансера
    composeEnhancers(applyMiddleware(sagaMiddleware, ...middlewares))
  );

  const task = rootSaga ? sagaMiddleware.run(initialSaga, reducerManager, rootSaga) : null

  return [store, task, sagaMiddleware];
}
