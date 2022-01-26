import React from "react";
import { Link } from "react-router5";

import { PAGES_URL_ALIASES } from "../../../../../common";

import styles              from "./styles.less";

export interface IContentViewProps {

};

export class ContentView extends React.PureComponent<IContentViewProps> {
  render() {
    // const { isDesktop } = this.props;

    return (
      <>
        <div className={styles.container}>
          <div>
            <div>
              404
            </div>
            <Link routeName={PAGES_URL_ALIASES.DOGS_LIST}>
              Список Собачек
            </Link><br/>
            <Link routeName={PAGES_URL_ALIASES.CATS_LIST}>
              Список Кошачек
            </Link><br/>
            <Link routeName={PAGES_URL_ALIASES.MAIN}>
              Главная
            </Link><br/>
          </div>
        </div>
      </>
    );
  }
};


