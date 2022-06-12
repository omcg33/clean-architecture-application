import React from "react";
import { Link } from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../common/dist";
import { generatePageUrl } from "../../app/router/helpers";

import styles              from "./styles.less";

export interface IViewProps {

};

export class View extends React.PureComponent<IViewProps> {
  render() {

    return (
      <>
        <div className={styles.container}>
          <div>
            <div>
              404
            </div>
            <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
              Список Собачек
            </Link><br/>
            <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
              Список Кошачек
            </Link><br/>
            <Link to={generatePageUrl(PAGES_URL_ALIASES.MAIN)}>
              Главная
            </Link><br/>
          </div>
        </div>
      </>
    );
  }
};


