export const LOAD       = 'PAGES/CATS_LIST/LOAD';
export const ADD        = 'PAGES/CATS_LIST/ADD';
export const CLEAR      = 'PAGES/CATS_LIST/CLEAR';
export const LOADING    = 'PAGES/CATS_LIST/LOADING';
export const LOADED     = 'PAGES/CATS_LIST/LOADED';
export const ERROR      = 'PAGES/CATS_LIST/ERROR';
export const UNMOUNT    = 'PAGES/CATS_LIST/UNMOUNT';


/**
 * Load data
 *
 * @param departureId
 * @param arrivalId
 * @return {{type: string, payload: {}}}
 */
interface ILoadProps {
	code: string;
}
export const load = (props: ILoadProps) => ({
	type: LOAD,
	payload: props
});


/**
 * add some data
 *
 * @param data
 * @return {{type: string, payload: {}}}
 */
export const add = (data: Object) => ({
	type: ADD,
	payload: { data }
});


/**
 * Clear data
 *
 * @return {{type: string, payload: {}}}
 */
export const clear = () => ({
	type: CLEAR,
	payload: {}
});


/**
 * set loading status
 *
 * @param isLoading {boolean}
 * @return {{type: string, payload: {isLoading: *}}}
 */
export const loading = (isLoading: boolean) => ({
	type: LOADING,
	payload: { isLoading }
});


/**
 * Loaded signal
 *
 * @return {{type: string, payload: {}}}
 */
export const loaded = () => ({
	type: LOADED
});


/**
 * Error signal with msg
 *
 * @param msg {string}
 * @return {{type: string, payload: {msg: *}}}
 */
export const error = (msg: string) => ({
	type: ERROR,
	payload: { msg }
});


/**
 * Unmount signal
 *
 * @param msg {string}
 * @return {{type: string, payload: {msg: *}}}
 */
export const unmount = () => ({
	type: UNMOUNT
});

