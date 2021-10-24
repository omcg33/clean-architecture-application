import * as React from "react";

import { Spinner as Component } from "../Spinner";

import styles from "./styles.less";

export const Spinner = (props) => (
  <>
    <Component className={styles.wrp} {...props}/>
    <div className={styles.curtain}/>
  </>
);
