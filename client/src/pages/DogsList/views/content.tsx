import * as React from "react";
import { Link }   from "react-router-dom";

import Container from "@tutu/order/lib/Container";
import Row       from "@tutu/order/lib/Row";
import Column    from "@tutu/order/lib/Column";

import { generatePageUrl, PAGES_URL_ALIASES } from "../../../../../interfaces/controllers/helpers/routes";
import { Dog }                                from "../../../components/Dog";

import styles from "./styles.less"

class Content extends React.PureComponent<any> {

  render() {
    const { dogs,isDesktop } = this.props;

    return (
      <>
        <Container fluid={!isDesktop} className={styles.container}>
          <Row>
            <Column col={12}>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
                Список кошечек
              </Link>
              {
                dogs
                  .map((dog,i) => <Dog className={styles.dog} dog={dog} key={i}/>)
              }
            </Column>
          </Row>
        </Container>
      </>
    );
  }
};

export default Content;


