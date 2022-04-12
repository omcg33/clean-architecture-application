import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { PAGES_URL_ALIASES } from "../../../../../common";
import { generatePageUrl } from "../../../app/router/helpers";

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
              <Link to={PAGES_URL_ALIASES.CATS_LIST}>
                Список Собачек
              </Link><br/>
              <Link to={PAGES_URL_ALIASES.MAIN}>
                Главная
              </Link><br/>
              {
                dogs
                  .map((dog,i) => (
                    <Fragment key={i}>
                      <Dog className={styles.dog} dog={dog} />
                      <Link to={generatePageUrl(PAGES_URL_ALIASES.DOG, { id: dog.get("id") })}>{dog.get("name")}</Link>
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
