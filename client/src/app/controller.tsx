import * as React  from "react";

// import { desktopMediaQueryListerner } from "../libs/mediaQuery";

import { View, IProps as IViewProps } from "./view";

export type IProps = {
  setIsDesktop: (isDesktop: boolean) => void;

  config: any;
} & IViewProps;

export const Controller = (props: IProps) => {
  return (
    <View
      {...props}
    />
  )
}
