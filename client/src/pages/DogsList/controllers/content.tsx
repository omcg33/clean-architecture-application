import * as React   from "react";

import View         from "../views/content";

export default class Component extends React.PureComponent<any, any> {
  //TODO: ТУТ можно писать логику отображения (callbacks)

  render() {
    return (
      <View
        {...this.props}
      />
    )
  }
}
