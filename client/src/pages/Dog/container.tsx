import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { BasicPage } from "../../components/hocs/BasicPage";
import { useDataLoader } from "../../components/hooks/useDataLoader";

import saga, { IGetPageDataParams } from "./sagas";
import { getDog, getHasData } from "./selectors";
import { Controller } from "./controller";
import { unmount } from "./actions";


export const Container = () => {
  const hasData = useSelector(getHasData);
  const dog = useSelector(getDog);
  const { id } = useParams();
  const params = useMemo(() =>({
    id: parseInt(id || '0')
  }),[]);

 useDataLoader<IGetPageDataParams>({ sagaToLoadData: saga, paramsToLoadData: params, unmountAction: unmount });

  return (
    <BasicPage
      hasData={hasData}     
    >
      <Controller
        dog={dog}
      />
    </BasicPage>
  )
}