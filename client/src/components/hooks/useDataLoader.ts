import { useEffect } from "react";
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

  return useEffect(
    () => {
      dispatch(runSaga({ saga: sagaToLoadData, params: paramsToLoadData }))

      return () => dispatch(unmountAction())
    },
    [dispatch, paramsToLoadData, sagaToLoadData, unmountAction]
  )
}
