import React, { useEffect } from "react";

import { Header }  from "../../../components/Header";
import { Spinner } from "../../../components/PageSpinner";

import styles      from "./styles.less";


export interface IBasePageProps {
  hasData: boolean;
  onDidMount: () => void;
  onWillUnmount: () => void;
}

export const BasicPage: React.FunctionComponent<IBasePageProps> = (props) => {
    const { hasData, children, onDidMount, onWillUnmount } = props;

    console.log('RENDER')
    useEffect(() => {
        console.log('DID MOUNT')
        onDidMount();

        return () => onWillUnmount()
    }, [])

    return (
        <>
          <div className={styles.headerWrp}>
              <Header
                className={styles.header}
              />
          </div>
  
          <div className={styles.pageContent}>
              {
                hasData
                  ? children
                  : <Spinner/>
              }
          </div>
        </>
      );
}