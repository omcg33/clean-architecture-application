import { withRouter } from "react-router";
import { connect } from "react-redux";

import { getMeta } from "../../modules/meta/selectors";
import { getConfig } from "../../modules/config/selectors";

import { setIsDesktop } from "../../modules/isDesktop/actions";

import { Controller, IProps as IControllerProps } from "../controller";


type IStateToProps = Pick<IControllerProps, "meta" | "config">;
type IDispatchToProps = Pick<
  IControllerProps,
  "setIsDesktop"   
>;
type IOwnProps = {};

const mapStateToProps = (state: any) => ({
  meta: getMeta(state),
  config: getConfig(state)
});

const mapDispatchToProps = {
  setIsDesktop,
};

const Container = withRouter(
  connect<IStateToProps, IDispatchToProps, IOwnProps, any>(
    mapStateToProps,
    mapDispatchToProps
  )(
    Controller
  )
);

export { Container };
