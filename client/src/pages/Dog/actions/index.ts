export const ADD        = 'PAGES/DOG/ADD';
export const LOADED     = 'PAGES/DOG/LOADED';
export const ERROR      = 'PAGES/DOG/ERROR';
export const UNMOUNT    = 'PAGES/DOG/UNMOUNT';

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

