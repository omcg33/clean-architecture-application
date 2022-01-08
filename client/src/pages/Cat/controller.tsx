import * as React   from "react";

import{ View, IViewProps }         from "./views";

export interface IControllerProps extends IViewProps {};

export class Controller extends React.PureComponent<IControllerProps> {
  //TODO: ТУТ можно писать логику отображения (callbacks)

  render() {
    return (
      <View
        {...this.props}
      />
    )
  }
}
