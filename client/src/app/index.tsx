import * as React                    from "react";
import { Helmet }                    from "react-helmet";
import { connect }                   from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import { getMeta }      from "../modules/meta/selectors";
import { getIsDesktop } from "../modules/isDesktop/selectors";

import { setIsDesktop } from "../modules/isDesktop/actions";

import { desktopMediaQueryListerner } from "../libs/mediaQuery";
import { getConfig }                  from "../modules/config/selectors";

import { getRoutes } from "./routes";

import styles from "./styles.less";

const mapStateToProps = (
  state: any,
  ownProps: any
) => ({
  meta: getMeta(state),
  isDesktop: getIsDesktop(state),
  config: getConfig(state)
});

const mapDispatchToProps = {
  setIsDesktop
};

class App extends React.Component<any> {

  constructor(props: any) {
    super(props);
    // moment.locale("ru");
  }

  componentDidMount() {
    desktopMediaQueryListerner(isDesktop => {
      this.props.setIsDesktop(isDesktop);
    });
  }

  render() {
    const { meta } = this.props,
      tags = meta.get("tags");

    return (
      <>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{meta.get("title", "").replace(/&nbsp;/gi, " ")}</title>
          <meta name="description" content={meta.get("description", "").replace(/&nbsp;/gi, " ")}/>
          <meta name="keywords" content={meta.get("keywords")}/>
          {
            !!tags &&
            tags.map(tag => <meta key={tag.get("property") || tag.get("name")} {...tag.toJS()}/>)
          }
        </Helmet>
        <div className={styles.wrp} id="__ssr__verify-layout">
          <Switch>
            {
              getRoutes().map(route => <Route {...route} key={(route.path || "*").toString()}/>)
            }
          </Switch>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
