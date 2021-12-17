export const ADD        = 'PAGES/MAIN/ADD';
export const LOADED     = 'PAGES/MAIN/LOADED';
export const ERROR      = 'PAGES/MAIN/ERROR';
export const UNMOUNT    = 'PAGES/MAIN/UNMOUNT';

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

