import * as React from "react";
import cn         from "classnames";

import { ImmutableMap }    from "../../interfaces";

// TODO: Убрать
type IAdoptedCatFull = any;

import styles              from "./styles.less";

export type ICatProps = {
  cat: ImmutableMap<IAdoptedCatFull>
}

export class Cat extends React.PureComponent<ICatProps & React.HTMLAttributes<HTMLDivElement>> {
  render() {
    const {className = "", cat, ...rest} = this.props,
      id = cat.get("id"),
      name = cat.get("name"),
      description = cat.get("description"),
      image = cat.get("image")
    ;
    return (
      <div className={cn(styles.wrapper, className)} {...rest}>
        id: { id }<br/>
        name: { name }<br/>
        description: { description }<br/>
        image: <img src={image} className={styles.img}/>
      </div>
    )
  }
}
