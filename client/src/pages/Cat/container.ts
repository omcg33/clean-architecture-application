import { connect } from "react-redux";

// import { getMeta }      from "../../../modules/meta/selectors";
import { getIsDesktop } from "../../modules/isDesktop/selectors";

import { getCat, getHasData } from "./selectors";

import { Controller } from "./controller";

const mapStateToProps = (state: any, props: any) => {  
  return {
    hasData: getHasData(state),
    cat: getCat(state),
    isDesktop: getIsDesktop(state),
  };
};

export const Container = connect(mapStateToProps)(Controller);
