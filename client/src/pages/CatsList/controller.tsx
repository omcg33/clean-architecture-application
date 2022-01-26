import * as React   from "react";

import { View, IViewProps } from "./views";

export class Controller extends React.PureComponent<IViewProps> {
  //TODO: ТУТ можно писать логику отображения (callbacks)

  render() {
    return (
      <View
        {...this.props}
      />
    )
  }
}
