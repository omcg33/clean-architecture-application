import * as React   from "react";

import { BasicPage, IBasePageProps } from "../../components/hocs/BasicPage"
import { View, IViewProps }         from "./view";

export type IControllerProps = IViewProps & IBasePageProps & {};

export class Controller extends React.PureComponent<IControllerProps> {
  //TODO: ТУТ можно писать логику отображения (callbacks)

  render() {
    const { hasData, onDidMount, onWillUnmount, ...rest } = this.props;
    return (
      <BasicPage hasData={hasData} onDidMount={onDidMount} onWillUnmount={onWillUnmount}>
        <View
          {...rest}
        />
      </BasicPage>
    )
  }
}
