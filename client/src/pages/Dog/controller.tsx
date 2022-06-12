import * as React   from "react";

import { View, IViewProps }         from "./view";

export type IControllerProps = IViewProps & {};

export class Controller extends React.PureComponent<IControllerProps> {
  //TODO: ТУТ можно писать логику отображения (callbacks)

  render() {
    const { ...rest } = this.props;

    return (
        <View
          {...rest}
        />
    )
  }
}
