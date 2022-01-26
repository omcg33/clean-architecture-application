import * as React from "react";



import { Header }  from "../../../components/Header";
import { Spinner } from "../../../components/PageSpinner";

import { ContentView, IContentViewProps } from "./content";
import styles                             from "./styles.less";

export interface IViewProps extends IContentViewProps {
  hasData: boolean;
}

export class View extends React.PureComponent<IViewProps> {
  render() {
    const { hasData, ...rest } = this.props;

    return (
      <>
        <div className={styles.headerWrp}>
          <div >
            <Header
              className={styles.header}
            />
          </div>
        </div>

        <div className={styles.pageContent}>
            {
              hasData
                ? <ContentView {...rest}/>
                : <Spinner/>
            }
        </div>
      </>
    );
  }
}
