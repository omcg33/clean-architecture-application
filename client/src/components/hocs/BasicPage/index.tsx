import React, { useEffect } from "react";

import { Header }  from "../../Header";
import { Spinner } from "../../PageSpinner";

import styles      from "./styles.less";


export interface IBasicPageProps {
  hasData: boolean;
  onDidMount: () => void;
  onWillUnmount: () => void;
}

export const BasicPage: React.FunctionComponent<IBasicPageProps> = (props) => {
    const { hasData, children, onDidMount, onWillUnmount } = props;

    useEffect(() => {
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