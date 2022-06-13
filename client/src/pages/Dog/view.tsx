import * as React from "react";
import { Link } from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../common/dist";
import { generatePageUrl } from "../../app/router/helpers";

import { DogCard, IDogProps } from "../../components/DogCard";

import styles from "./styles.less";

export interface IViewProps {
  dog: IDogProps["dog"]
}

export const View = (props: IViewProps) => {
  const { dog } = props;

  return (
    <>
        <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
          Список Собачек
        </Link><br/>
        <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
          Список Кошачек
        </Link><br/>
        <Link to={{ pathname: generatePageUrl(PAGES_URL_ALIASES.MAIN) }}>
          Главная
        </Link><br/>

        <DogCard dog={dog} className={styles.dog} />            
    </>
  )
}