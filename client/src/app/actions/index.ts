import {Saga}       from 'redux-saga';

export const RUN    = "SAGAS/RUN";
export const STOP   = "SAGAS/STOP";

export const run = (saga: Saga<any>) => ({
    type: RUN,
    payload: saga
});

export const stop = () => ({
    type: STOP
});
