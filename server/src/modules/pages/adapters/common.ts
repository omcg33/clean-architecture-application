import { ICommonPageData } from "../services/common.service";

export const adaptCommonPageDataToCommonInitialState = (data: ICommonPageData) => {
    const { location, ...rest } = data;

    return {
        ...rest
    }
}