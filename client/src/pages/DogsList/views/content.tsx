import * as React from "react";
import { Link }   from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../../common";
import { generatePageUrl } from "../../../app/routes/helpers";


import { Dog }                                from "../../../components/Dog";

import styles from "./styles.less"

export interface IProps {
  //TODO: исправить
  dogs?: any;  
}

class Content extends React.PureComponent<IProps> {

  render() {
    const { dogs } = this.props;

    return (
      <>
        <div className={styles.container}>
          <div>
            <div>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
                Список кошечек
              </Link><br/>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.MAIN)}>
                Главная
              </Link>
              {
                dogs
                  .map((dog,i) => <Dog className={styles.dog} dog={dog} key={i}/>)
              }
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Content;


