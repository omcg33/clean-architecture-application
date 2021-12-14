import { connect } from "react-redux";

import { run as runSaga } from "../../../app/actions";

import { unmount } from "../actions";

// import { getMeta }      from "../../../modules/meta/selectors";
import { getIsDesktop } from "../../../modules/isDesktop/selectors";

import { getCat, getHasData } from "../selectors";

import Controller from "../controllers";

const mapStateToProps = (state: any, props: any) => {
  //TODO: Здесь будут лежать параметры распаршенные ReactRouter по path из урла
  const { match: { params: { id } } } = props;

  return {
    // urlAlias,
    hasData: getHasData(state),
    // meta: getMeta(state),
    catId: parseInt(id),
    cat: getCat(state),
    isDesktop: getIsDesktop(state),
  };
};

const mapDispatchToProps = {
  runSaga,
  unmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
