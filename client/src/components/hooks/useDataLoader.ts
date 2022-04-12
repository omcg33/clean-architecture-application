import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Saga } from "redux-saga";

import { run as runSaga } from "../../app/actions";

export interface IDataLoaderProps<P> {
    sagaToLoadData: Saga;
    unmountAction: () => void;

    paramsToLoadData?: P;
}

export const useDataLoader = <P extends  {}>(props: IDataLoaderProps<P>) => {
    const { paramsToLoadData, sagaToLoadData, unmountAction } = props;

    const dispatch = useDispatch();
    const onDidMount = useCallback(
      () => dispatch(runSaga({ saga: sagaToLoadData, params: paramsToLoadData })),
      [dispatch, paramsToLoadData]
    );
    const onWillUnmount = useCallback(
      () => dispatch(unmountAction()),
      [dispatch, unmountAction]
    );

    return [onDidMount, onWillUnmount]
}