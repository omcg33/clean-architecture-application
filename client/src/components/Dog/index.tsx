import * as React from "react";
import cn         from "classnames";

import { ImmutableMap }    from "../../interfaces";// TODO: Убрать
type IAdoptedDogFull = any;
import styles              from "./styles.less";

export type IDogProps = {
  dog: ImmutableMap<IAdoptedDogFull>
}

export class Dog extends React.PureComponent<IDogProps & React.HTMLAttributes<HTMLDivElement>> {
  render() {
    const {className = "", dog, ...rest} = this.props,
      id = dog.get("id"),
      name = dog.get("name"),
      description = dog.get("description"),
      isGoodBoy = dog.get("isGoodBoy"),
      image = dog.get("image")
    ;
    return (
      <div className={cn(styles.wrapper, className)} {...rest}>
        id: { id }<br/>
        name: { name }<br/>
        description: { description }<br/>
        isGoodBoy: { isGoodBoy ? "ДА" : "НЕТ"}<br/>
        image: <img src={image} className={styles.img}/>
      </div>
    )
  }
}
