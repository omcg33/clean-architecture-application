export const ADD        = 'PAGES/DOGS_LIST/ADD';
export const LOADED     = 'PAGES/DOGS_LIST/LOADED';
export const ERROR      = 'PAGES/DOGS_LIST/ERROR';
export const UNMOUNT    = 'PAGES/DOGS_LIST/UNMOUNT';

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

