import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet }   from "react-helmet";

import { PAGES_URL_ALIASES } from "../../../../common/dist";
import { generatePageUrl } from "../../app/router/helpers";

import { DogCard, IDogProps } from "../../components/DogCard";

import styles from "./styles.less"

export interface IViewProps {
  dogs: IDogProps["dog"][]
}

export class View extends React.PureComponent<IViewProps> {

  render() {
    const { dogs } = this.props;

    return (
      <>
        <Helmet>
          <title>Список Собак</title>
        </Helmet>
        <div className={styles.container}>
          <div>
            <div>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
                Список Собачек
              </Link><br/>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.MAIN)}>
                Главная
              </Link><br/>
              {
                dogs
                  .map((dog,i) => (
                    <Fragment key={i}>
                      <DogCard className={styles.dog} dog={dog} />
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
