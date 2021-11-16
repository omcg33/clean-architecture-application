import { connect } from "react-redux";

import { run as runSaga } from "../../../app/actions";

import { unmount } from "../actions";

// import { getMeta }      from "../../../modules/meta/selectors";
import { getConfig }    from "../../../modules/config/selectors";
import { getIsDesktop } from "../../../modules/isDesktop/selectors";

import { getCats, getHasData } from "../selectors";

import Controller from "../controllers";

const mapStateToProps = (state: any, props: any) => {
  //TODO: Здесь будут лежать параметры распаршенные ReactRouter по path из урла
  // const { match: { params: { urlAlias } } } = props;

  return {
    // urlAlias,
    hasData: getHasData(state),
    // meta: getMeta(state),
    cats: getCats(state),
    isDesktop: getIsDesktop(state),
    config: getConfig(state),
  };
};

const mapDispatchToProps = {
  runSaga,
  unmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
