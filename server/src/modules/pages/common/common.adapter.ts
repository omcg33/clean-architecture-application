import { ICommonPageData } from "./common.service";

export const adaptCommonPageDataToCommonInitialState = (data: ICommonPageData) => {
    // const { location, ...rest } = data;

    return {
        ...data
    }
}