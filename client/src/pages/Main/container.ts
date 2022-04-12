import { connect } from "react-redux";

import { run as runSaga } from "../../app/actions";
import { getIsDesktop } from "../../modules/isDesktop/selectors";

import { unmount } from "./actions";
import saga from "./sagas";
import { getCats, getDogs, getHasData } from "./selectors";
import { Controller } from "./controller";

const mapStateToProps = (state: any, props: any) => {
  return {
    hasData: getHasData(state),
    cats: getCats(state),
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
