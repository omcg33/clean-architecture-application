import * as React from "react";
import { Link }   from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../../consts";
import { generatePageUrl } from "../../../app/routes";


import { Cat } from "../../../components/Cat";
import { Dog } from "../../../components/Dog";

import styles from "./styles.less";

class Content extends React.PureComponent<any> {

  render() {
    const { cats, dogs } = this.props;

    return (
      <>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
            Список Собачек
          </Link>
          <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
            Список Кошачек
          </Link>
          {
            cats
              .map((cat,i) => <Cat cat={cat} className={styles.cat} key={i}/>)
          }  
          <hr/>          
          <hr/>          
          <hr/>          
          <hr/>     
          {
            dogs
              .map((dog,i) => <Dog dog={dog} className={styles.dog} key={i}/>)
          }  

      </>
    );
  }
};

export default Content;
