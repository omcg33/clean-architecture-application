export const SET = 'META/SET';

export const set = (meta: any) => ({
	type: SET,
	payload: meta
});
