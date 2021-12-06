import * as React from "react";
import { Link }   from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../../common";
import { generatePageUrl } from "../../../app/routes/helpers";

import { Cat } from "../../../components/Cat";

import styles from "./styles.less";

class Content extends React.PureComponent<any> {

  render() {
    const { cats } = this.props;

    return (
      <>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
            Список Собачек
          </Link><br/>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.MAIN)}>
            Главная
          </Link>
          {
            cats
              .map((cat,i) => <Cat cat={cat} className={styles.cat} key={i}/>)
          }            
      </>
    );
  }
};

export default Content;

