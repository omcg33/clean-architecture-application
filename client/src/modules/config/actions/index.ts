export const ADD = 'CONFIG/ADD';

export interface IAddAction {
	type: string;
	payload: any;
}
export type IAdd = (config: any) => IAddAction;

export const add = (config: any) => ({
	type: ADD,
	payload: { config }
});
