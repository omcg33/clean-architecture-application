import axios    from "axios";
import { Saga } from "redux-saga";
import {
    fork, put, takeEvery, select
}               from "redux-saga/effects";

// // import i18n                      from 'modules/i18n/sagas';
import logger               from "../../modules/logger/sagas";
import { sendLog }          from "../../modules/logger/actions";
import { getConfig }        from "../../modules/config/selectors";
import SystemLogger         from "../../utils/systemLogger";


const sysLogger = new SystemLogger('root');
const NOT_SEND_ERRORS = [
    'API_PARSING_ERROR',
    'API_UNAUTHORIZED',
    'API_TRANPORT_ERROR',
    'API_REQUEST_ERROR',
    'API_INTERNAL_ERROR'
];


/**
 *
 */
export function* initialSagas() {
    const config = yield select(getConfig);

    axios.defaults =  {
        ...axios.defaults,
        withCredentials  : true,
        maxContentLength : (config.get('maxContentLength') * 1024) * 1024,
        timeout          : config.get('apiRequestTimeout'),
    };

    // yield fork(i18n);
    yield fork(logger);
}


export function* sysLoggerSaga() {
    yield takeEvery('*', function (action) {
        sysLogger.addAction(action);
    });
}


/**
 * Default saga runner.
 *
 * @param runSaga
 */
export default function (runSaga: Saga<any>) {
    return function* rootSaga() {

        yield fork(sysLoggerSaga);

        try {
            sysLogger.addLog('saga load');
            yield fork(initialSagas);
            yield runSaga();
        } catch (e) {
            const { name, stack, message } = e;

            if ( process.env.NODE_ENV === 'production' ) { // eslint-disable-line
                // Don't send already sent errors from server
                if (! ~NOT_SEND_ERRORS.indexOf(name)) {
                    yield put(sendLog('SAGA_ERROR', {
                        name,
                        stack,
                        message,
                        ...sysLogger.getLogs()
                    }, message));
                }
            } else {
                console.error(e);  // eslint-disable-line
            }
        }
    };
}

