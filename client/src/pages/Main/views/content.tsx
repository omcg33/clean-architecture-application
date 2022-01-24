import * as React from "react";
import { Link } from "react-router5";
import { PAGES_URL_ALIASES } from "../../../../../common";

import { Cat, ICatProps } from "../../../components/Cat";
import { Dog, IDogProps } from "../../../components/Dog";

import styles from "./styles.less";

export interface IContentViewProps {
  cats: ICatProps["cat"][];
  dogs: IDogProps["dog"][];
}

export class ContentView extends React.PureComponent<any> {

  render() {
    const { cats, dogs } = this.props;

    return (
      <>
          <Link routeName={PAGES_URL_ALIASES.DOGS_LIST}>
            Список Собачек
          </Link>
          <Link routeName={PAGES_URL_ALIASES.DOG} routeParams={{ id: 10 }}>DOG 10</Link><br/>
          <Link routeName={PAGES_URL_ALIASES.CATS_LIST}>
            Список Кошачек
          </Link>
          <Link routeName={PAGES_URL_ALIASES.CAT} routeParams={{ id: 10 }}>CAT 10</Link>
          {
            cats
              .map((cat,i) => <>
                <Cat cat={cat} className={styles.cat} key={i}/>
                <Link routeName={PAGES_URL_ALIASES.CAT} routeParams={{ id: cat.get("id") }}>{cat.get("name")}</Link>
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
                <Link routeName={PAGES_URL_ALIASES.DOG} routeParams={{ id: dog.get("id") }}>{dog.get("name")}</Link>
              </>)
          }  
      </>
    );
  }
};
