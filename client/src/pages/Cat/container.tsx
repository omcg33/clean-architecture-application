import React from "react";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BasicPage } from "../../components/hocs/BasicPage";

import saga, { IGetPageDataParams } from "./sagas";
import { getCat, getHasData } from "./selectors";
import { Controller } from "./controller";
import { unmount } from "./actions";
import { useDataLoader } from "../../components/hooks/useDataLoader";


export const Container = () => {
  const hasData = useSelector(getHasData);
  const cat = useSelector(getCat);
  const routeParams = useParams();
  const params = {
    id: parseInt(routeParams.id || '0')
  };
  const [onDidMount, onWillUnmount]= useDataLoader<IGetPageDataParams>({ sagaToLoadData: saga, paramsToLoadData: params, unmountAction: unmount });

  return (
    <BasicPage
      hasData={hasData}
      onDidMount={onDidMount}
      onWillUnmount={onWillUnmount}
    >
      <Controller
        cat={cat}
      />
    </BasicPage>
  )
}