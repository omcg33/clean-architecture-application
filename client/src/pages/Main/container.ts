import { connect } from "react-redux";

import { getIsDesktop } from "../../modules/isDesktop/selectors";

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


export default connect(mapStateToProps)(Controller);
