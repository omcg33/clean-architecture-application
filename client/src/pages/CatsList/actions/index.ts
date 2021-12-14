export const ADD        = 'PAGES/CATS_LIST/ADD';
export const LOADED     = 'PAGES/CATS_LIST/LOADED';
export const ERROR      = 'PAGES/CATS_LIST/ERROR';
export const UNMOUNT    = 'PAGES/CATS_LIST/UNMOUNT';

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

