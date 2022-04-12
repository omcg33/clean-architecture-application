import { connect } from "react-redux";

import { run as runSaga } from "../../app/actions";
import { getIsDesktop } from "../../modules/isDesktop/selectors";

import { getDogs, getHasData } from "./selectors";
import saga from "./sagas";
import { Controller } from "./controller";
import { unmount } from "./actions";

const mapStateToProps = (state: any, props: any) => {
  return {
    hasData: getHasData(state),
    dogs: getDogs(state),
    isDesktop: getIsDesktop(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {    
    onDidMount: () => dispatch(runSaga({ saga })),
    onWillUnmount: () => dispatch(unmount()),
  }
}


export const Container = connect(mapStateToProps, mapDispatchToProps)(Controller);
