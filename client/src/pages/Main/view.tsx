import * as React from "react";
import { Link } from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../common/dist";
import { generatePageUrl } from "../../app/router/helpers";

import { Cat, ICatProps } from "../../components/Cat";
import { Dog, IDogProps } from "../../components/Dog";

import styles from "./styles.less";

export interface IViewProps {
  cats: ICatProps["cat"][];
  dogs: IDogProps["dog"][];
}

export class View extends React.PureComponent<IViewProps> {

  render() {
    const { cats, dogs } = this.props;

    return (
      <>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
            Список Собачек
          </Link>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOG, { id:10 })}>DOG 10</Link>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
            Список Кошачек
          </Link>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id: 10 })}>CAT 10</Link>
          {
            cats
              .map((cat,i) => <>
                <Cat cat={cat} className={styles.cat} key={i}/>
                <Link to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id: cat.get("id") })}>{cat.get("name")}</Link>
              </>
            )
          }  
          <hr/>          
          <hr/>          
          <hr/>          
          <hr/>   
          <hr/>   
          {
            dogs
              .map((dog,i) => <>
                <Dog dog={dog} className={styles.dog} key={i}/>
                <Link to={generatePageUrl(PAGES_URL_ALIASES.DOG, { id: dog.get("id") })}>{dog.get("name")}</Link>
              </>)
          }  
      </>
    );
  }
};
