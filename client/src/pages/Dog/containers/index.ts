import { connect } from "react-redux";

import { run as runSaga } from "../../../app/actions";

import { unmount } from "../actions";

// import { getMeta }      from "../../../modules/meta/selectors";
import { getIsDesktop } from "../../../modules/isDesktop/selectors";

import { getDog, getHasData } from "../selectors";

import Controller from "../controllers";

const mapStateToProps = (state: any, props: any) => {
  //TODO: Здесь будут лежать параметры распаршенные ReactRouter по path из урла
  const { match: { params: { id } } } = props;

  return {
    // urlAlias,
    hasData: getHasData(state),
    // meta: getMeta(state),
    dogId: parseInt(id),
    dog: getDog(state),
    isDesktop: getIsDesktop(state),
  };
};

const mapDispatchToProps = {
  runSaga,
  unmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
