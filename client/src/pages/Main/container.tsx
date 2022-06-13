import React from "react";
import {  useSelector } from "react-redux";

import { BasicPage } from "../../components/hocs/BasicPage";
import { useDataLoader } from "../../components/hooks/useDataLoader";

import saga from "./sagas";
import { getDogs, getCats, getHasData } from "./selectors";
import { Controller } from "./controller";
import { unmount } from "./actions";


export const Container = () => {
  const hasData = useSelector(getHasData);
  const dogs = useSelector(getDogs);
  const cats = useSelector(getCats);

  useDataLoader({ sagaToLoadData: saga, unmountAction: unmount });

  return (
    <BasicPage
      hasData={hasData}
    >
      <Controller
        dogs={dogs}
        cats={cats}
      />
    </BasicPage>
  )
}