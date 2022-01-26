import React, { Fragment } from "react";
import { Link } from "react-router5";

import { PAGES_URL_ALIASES } from "../../../../../common";

import { Cat, ICatProps } from "../../../components/Cat";

import styles from "./styles.less";

export interface IContentViewProps {
  cats: ICatProps["cat"][];
}

export class ContentView extends React.PureComponent<IContentViewProps> {

  render() {
    const { cats } = this.props;

    return (
      <>
          <Link routeName={PAGES_URL_ALIASES.DOGS_LIST}>
            Список Собачек
          </Link><br/>
          <Link routeName={PAGES_URL_ALIASES.MAIN}>
            Главная
          </Link><br/>
          {
            cats
              .map((cat,i) => (
                <Fragment key={i}>
                  <Cat cat={cat} className={styles.cat} key={i}/>
                  <Link routeName={PAGES_URL_ALIASES.CAT} routeParams={{ id: cat.get("id") }}>{cat.get("name")}</Link>
                </Fragment>
              ))
          }            
      </>
    );
  }
};

