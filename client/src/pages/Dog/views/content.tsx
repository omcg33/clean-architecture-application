import * as React from "react";
import { Link } from "react-router5";

import { PAGES_URL_ALIASES } from "../../../../../common";

import { Dog, IDogProps } from "../../../components/Dog";

import styles from "./styles.less";

export interface IContentViewProps {
  dog: IDogProps["dog"]
}

export class ContentView extends React.PureComponent<IContentViewProps> {
  render() {
    const { dog } = this.props;

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

          <Dog dog={dog} className={styles.dog} />            
      </>
    )
  }
};
