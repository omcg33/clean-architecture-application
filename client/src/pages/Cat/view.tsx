import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet }   from "react-helmet";

import { PAGES_URL_ALIASES } from "../../../../common";
import { generatePageUrl } from "../../app/router/helpers";

import { CatCard, ICatProps } from "../../components/CatCard";

import styles from "./styles.less";

export interface IViewProps {
  cat: ICatProps["cat"]
}
export class View extends React.PureComponent<IViewProps> {

  render() {
    const { cat } = this.props;

    return (
      <>
          <Helmet>
            <title>{ `КОШКА ${cat.get("id")}`}</title>
          </Helmet>
         
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
            Список Собачек
          </Link><br/>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
            Список Кошачек
          </Link><br/>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.MAIN)}>
            Главная
          </Link><br/>
          
          <CatCard cat={cat} className={styles.cat} />     

          <br/>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id: 1 })}>
            Кошка 1
          </Link><br/>  
          <Link to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id: 2 })}>
            Кошка 2
          </Link><br/>       
      </>
    );
  }
};

