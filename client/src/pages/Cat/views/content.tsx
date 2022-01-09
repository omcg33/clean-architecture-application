import * as React from "react";
import { Link } from "react-router5";

import { PAGES_URL_ALIASES } from "../../../../../common";

import { Cat, ICatProps } from "../../../components/Cat";

import styles from "./styles.less";

export interface IContentViewProps {
  cat: ICatProps["cat"]
}
export class ContentView extends React.PureComponent<IContentViewProps> {

  render() {
    const { cat } = this.props;

    return (
      <>
          <Link routeName={PAGES_URL_ALIASES.DOGS_LIST}>
            Список Собачек
          </Link><br/>
          <Link routeName={PAGES_URL_ALIASES.CATS_LIST}>
            Список Кошачек
          </Link><br/>
          <Link routeName={PAGES_URL_ALIASES.MAIN}>
            Главная
          </Link><br/>
          
          <Cat cat={cat} className={styles.cat} />     

          <br/>
          <Link routeName={PAGES_URL_ALIASES.CAT} routeParams={{ id: 1 }}>
            Кошка 1
          </Link><br/>  
          <Link routeName={PAGES_URL_ALIASES.CAT} routeParams={{ id: 2 }}>
            Кошка 2
          </Link><br/>       
      </>
    );
  }
};

