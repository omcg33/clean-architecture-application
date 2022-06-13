import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BasicPage } from "../../components/hocs/BasicPage";
import { useDataLoader } from "../../components/hooks/useDataLoader";

import saga, { IGetPageDataParams } from "./sagas";
import { getCat, getHasData } from "./selectors";
import { Controller } from "./controller";
import { unmount } from "./actions";


export const Container = () => {
  const hasData = useSelector(getHasData);
  const cat = useSelector(getCat);
  const { id } = useParams();
  const params = useMemo(() => ({
    id: parseInt(id || '0')
  }), [id]);

  useDataLoader<IGetPageDataParams>({ sagaToLoadData: saga, paramsToLoadData: params, unmountAction: unmount });

  return (
    <BasicPage
      hasData={hasData}     
    >
      <Controller
        cat={cat}
      />
    </BasicPage>
  )
}