export const SEND           = 'ENTITY/LOGGER/SEND';

interface IPayload {
	code: string;
	context: any;
	message: string;
}
export interface IResult {
	type: string;
	payload: IPayload;
}

export const sendLog: (
	code: string,
	context?: any,
	message?: string
) => IResult = (code, context = {}, message = "") => ({
  type: SEND,
  payload: { code, context, message }
});
