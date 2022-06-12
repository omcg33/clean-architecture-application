import React from "react";
import {  useSelector } from "react-redux";

import { BasicPage } from "../../components/hocs/BasicPage";

import saga from "./sagas";
import { getHasData } from "./selectors";
import { Controller } from "./controller";
import { unmount } from "./actions";
import { useDataLoader } from "../../components/hooks/useDataLoader";


export const Container = () => {
  const hasData = useSelector(getHasData);
  const [onDidMount, onWillUnmount ]= useDataLoader({ sagaToLoadData: saga, unmountAction: unmount });

  return (
    <BasicPage
      hasData={hasData}
      onDidMount={onDidMount}
      onWillUnmount={onWillUnmount}
    >
      <Controller
      />
    </BasicPage>
  )
}