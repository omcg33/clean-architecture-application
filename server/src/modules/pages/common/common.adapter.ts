import { ICommonPageData } from "./common.service";

export const adaptCommonPageDataToCommonInitialState = (data: ICommonPageData) => {
    const { location, ...rest } = data;
    const is404 = location?.state?.is404 || false;

    return {
        is404,
        ...rest
    }
}