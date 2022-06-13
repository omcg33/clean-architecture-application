import React, { useEffect } from "react";

import { Header }  from "../../Header";
import { Footer }  from "../../Footer";
import { Spinner } from "../../Spinner";

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
        <div className={styles.container}>
          <Header
            className={styles.header}
          />
  
          <div className={styles.content}>
            {
              hasData
                ? children
                : <div className={styles.spinnerContainer}><Spinner className={styles.spinner}/></div>
            }  
          </div>

          <Footer
            className={styles.footer}
          />
        </div>
      );
}