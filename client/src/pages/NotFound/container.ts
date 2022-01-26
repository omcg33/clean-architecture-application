import { connect } from "react-redux";

import { getIsDesktop } from "../../modules/isDesktop/selectors";

import { getHasData } from "./selectors";

import { Controller } from "./controller";

const mapStateToProps = (state: any, props: any) => {
  return {
    hasData: getHasData(state),
    isDesktop: getIsDesktop(state),
  };
};

export const Container = connect(mapStateToProps)(Controller);