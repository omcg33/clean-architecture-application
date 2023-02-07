import { fork, takeEvery, call }        from 'redux-saga/effects';
import { post }                         from '../../../helpers/httpClient';

import { SEND, IResult }                from '../actions';

export function* sendLog() {
	yield takeEvery(SEND, function* ({ payload }: IResult) {
		yield call(post, '/log', payload, '');
	});
}

export default function* rootSaga() {
	yield fork(sendLog);
}
