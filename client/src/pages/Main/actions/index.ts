export const LOAD       = 'PAGES/MAIN/LOAD';
export const ADD        = 'PAGES/MAIN/ADD';
export const CLEAR      = 'PAGES/MAIN/CLEAR';
export const LOADING    = 'PAGES/MAIN/LOADING';
export const LOADED     = 'PAGES/MAIN/LOADED';
export const ERROR      = 'PAGES/MAIN/ERROR';
export const UNMOUNT    = 'PAGES/MAIN/UNMOUNT';


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
	payload: data
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

