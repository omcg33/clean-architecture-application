import React, { Fragment } from "react";
import { Link } from "react-router5";

import { PAGES_URL_ALIASES } from "../../../../../common";

import { Dog, IDogProps } from "../../../components/Dog";

import styles from "./styles.less"

export interface IContentViewProps {
  dogs: IDogProps["dog"][]
}

export class ContentView extends React.PureComponent<IContentViewProps> {

  render() {
    const { dogs } = this.props;

    return (
      <>
        <div className={styles.container}>
          <div>
            <div>
              <Link routeName={PAGES_URL_ALIASES.CATS_LIST}>
                Список Собачек
              </Link><br/>
              <Link routeName={PAGES_URL_ALIASES.MAIN}>
                Главная
              </Link><br/>
              {
                dogs
                  .map((dog,i) => (
                    <Fragment key={i}>
                      <Dog className={styles.dog} dog={dog} />
                      <Link routeName={PAGES_URL_ALIASES.DOG} routeParams={{ id: dog.get("id") }}>{dog.get("name")}</Link>
                    </Fragment>
                  ))
              }
            </div>
          </div>
        </div>
      </>
    );
  }
};
