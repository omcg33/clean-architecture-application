export const ADD        = 'PAGES/CAT/ADD';
export const LOADED     = 'PAGES/CAT/LOADED';
export const ERROR      = 'PAGES/CAT/ERROR';
export const UNMOUNT    = 'PAGES/CAT/UNMOUNT';

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

