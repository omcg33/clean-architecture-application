import * as React from "react";

import { Header }  from "../../../components/Header";
import { Spinner } from "../../../components/PageSpinner";

import Content        from "../controllers/content";
import styles         from "./styles.less";

class Page extends React.PureComponent<any> {
  render() {
    const { hasData } = this.props;

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
                ? <Content {...this.props}/>
                : <Spinner/>
            }
        </div>
      </>
    );
  }
}

export default Page;
