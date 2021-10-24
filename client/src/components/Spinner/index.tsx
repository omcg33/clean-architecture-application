import React from "react";
import cn from "classnames";

import styles from "./styles.less";

export const Spinner = (props) => {
  const {className = ""} = props;

  return (
    <div className={cn(className, styles.wrp)}>
      <img src={require("./spinner.gif")} alt=""/>
    </div>
  )
};
