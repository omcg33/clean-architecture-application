import * as React from "react";

import saga from "../sagas";
import View from "../views";

class Controller extends React.PureComponent<any> {
  componentDidMount() {
    this.props.runSaga({ saga, params: { id: this.props.dogId } });
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  render() {
    const { runSaga, code, unmount, load, ...rest } = this.props;

    return (
      <View
        {...rest}
      />
    );
  }
}

export default Controller;
