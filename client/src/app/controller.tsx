import * as React  from "react";

// import { desktopMediaQueryListerner } from "../helpers/mediaQuery";

import { View, IProps as IViewProps } from "./view";

export type IProps = {
  setIsDesktop: (isDesktop: boolean) => void;

  config: any;
} & IViewProps;

export class Controller extends React.PureComponent<IProps> {  

  componentDidMount() {   
    // desktopMediaQueryListerner(isDesktop => {
    //   this.props.setIsDesktop(isDesktop);
    // });
  }

  componentDidCatch(error: Error) {
    //window?.Raven?.captureException(error);
  }

  render() {
    return (
      <View
        {...this.props}
      />
    )
  }
}
