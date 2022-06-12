export const ADD        = 'PAGES/NOT_FOUND/ADD';
export const LOADED     = 'PAGES/NOT_FOUND/LOADED';
export const ERROR      = 'PAGES/NOT_FOUND/ERROR';
export const UNMOUNT    = 'PAGES/NOT_FOUND/UNMOUNT';

export const add = (data: Object) => ({
	type: ADD,
	payload: data
});

export const loaded = () => ({
	type: LOADED
});

export const error = (msg: string) => ({
	type: ERROR,
	payload: { msg }
});

export const unmount = () => ({
	type: UNMOUNT
});

