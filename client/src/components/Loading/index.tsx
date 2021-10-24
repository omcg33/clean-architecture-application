import * as React               from "react";
import {
  LoadingComponentProps
}                               from "react-loadable";

import { Spinner } from "../Spinner";
import styles      from "./styles.less";

export default function Loading(props: LoadingComponentProps): any {
  if (props.isLoading) {
    if (props.timedOut) {
      return <Spinner className={styles.loader}/>;
    } else if (props.pastDelay) {
      return <Spinner className={styles.loader}/>;
    } else {
      return <Spinner className={styles.loader}/>;
    }
  } else if (props.error) {
    console.error(props.error);
    return <p>Error! Component failed to load</p>;
  } else {
    return null;
  }
}
