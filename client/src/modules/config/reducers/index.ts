import { Map, fromJS }  from 'immutable';
import {
	ADD,
	IAddAction
}                       from '../actions';


const initialState = Map({});


export function config(state = initialState, action: IAddAction) {
	switch (action.type) {
		case ADD: {
			return fromJS(action.payload.config);
		}

		default: return state;
	}
}


export default {};
