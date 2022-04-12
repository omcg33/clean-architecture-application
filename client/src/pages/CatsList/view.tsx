import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../common/dist";
import { generatePageUrl } from "../../app/router/helpers";

import { Cat, ICatProps } from "../../components/Cat";

import styles from "./styles.less";

export interface IViewProps {
  cats: ICatProps["cat"][];
}

export class View extends React.PureComponent<IViewProps> {

  render() {
    const { cats } = this.props;

    return (
      <>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
            Список Собачек
          </Link><br/>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.MAIN)}>
            Главная
          </Link><br/>
          {
            cats
              .map((cat,i) => (
                <Fragment key={i}>
                  <Cat cat={cat} className={styles.cat} key={i}/>
                  <Link to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id: cat.get("id") })}>{cat.get("name")}</Link>
                </Fragment>
              ))
          }            
      </>
    );
  }
};

