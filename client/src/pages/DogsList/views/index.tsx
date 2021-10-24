import * as React from "react";

import Container            from "@tutu/order/lib/Container";


import { Header }  from "../../../components/Header";
import { Spinner } from "../../../components/PageSpinner";

import Content        from "../controllers/content";
import styles         from "./styles.less";

class Page extends React.PureComponent<any> {
  render() {
    const { hasData, isDesktop } = this.props;

    return (
      <>
        <div className={styles.headerWrp}>
          <Container fluid={!isDesktop}>
            <Header
              className={styles.header}
            />
          </Container>
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
