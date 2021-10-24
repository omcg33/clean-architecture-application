import * as React from "react";
import { Link }   from "react-router-dom";

import Container         from "@tutu/order/lib/Container";
import Row               from "@tutu/order/lib/Row";
import Column            from "@tutu/order/lib/Column";
import Text              from "@tutu/order/lib/Text";


import styles              from "./styles.less";
import { PAGES_URL_ALIASES, generatePageUrl } from "../../../../../interfaces/controllers/helpers/routes";

class Content extends React.PureComponent<any> {

  render() {
    const { isDesktop } = this.props;

    return (
      <>
        <Container fluid={!isDesktop} className={styles.container}>
          <Row>
            <Column col={12}>
              <Text header size="XXL" centered>404</Text>
            </Column>
            <Column col={6}>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
                Список кошечек
              </Link>
            </Column>
            <Column col={6}>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
                Список собачек
              </Link>
            </Column>
          </Row>
        </Container>
      </>
    );
  }
};

export default Content;

