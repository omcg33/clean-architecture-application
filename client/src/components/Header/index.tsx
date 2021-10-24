import * as React        from "react";
import { connect }       from "react-redux";
import { ThemeProvider } from "react-css-themr";

import AdaptiveHat, {
  getEmitter,
  EVENTS
}                        from "@tutu/hat/adaptive-trip";
import getLabel          from "@tutu/get-label";


import { login, logout } from "../../modules/user/actions";
import { getUser }       from "../../modules/user/selectors";
import { getConfig }     from "../../modules/config/selectors";
import { getIsDesktop }  from "../../modules/isDesktop/selectors";

import labels from "./labels/rus/index.json";

const mobileDefaultTheme = {
  Header: require("./theme/mobile/default/header.less"),
  HeaderLink: require("./theme/mobile/default/headerLink.less")
};

const desktopDefaultTheme = {
  NavItem: require("./theme/desktop/default/navigation")
};

const desktopWhiteTheme = {
  NavItem: require("./theme/desktop/white/navigation"),
  TopLinks: require("./theme/desktop/white/topLinks"),
  HeadLine: require("./theme/desktop/white/headLine")
};

const desktopNavigation = {
  hotels: {
    isShow: false
  },
  story: {
    isShow: false
  },
  catchAttention: false
};

const mobileNavigation = {
  search: {
    isShow: true,
    url: "/",
    title: getLabel(labels, "mobile.navigation.search.title")
  },
  contactInfo: {
    isShow: true,
    value: getLabel(labels, "mobile.navigation.contactInfo.value")
  },
  catchAttention: false
};

export const emitter = getEmitter();

export class View extends React.PureComponent<any, any> {
  componentDidMount() {
    emitter.on(EVENTS.USER_SUCCESS_LOGIN, this.props.login);
    emitter.on(EVENTS.USER_SUCCESS_REGISTER, this.props.login);
    emitter.on(EVENTS.USER_LOGOUT, this.props.logout);
  }

  render() {
    const { page, logdata, isWhite, login, logout, config, user, isDesktop, profileClicked, ...rest } = this.props,
      logo = {
        version: 2018
      },
      params = {
        isNewIdentity: true,
        isDesktop,
        title: getLabel(labels, "title"),
        userWayParams: {
          page: `tours_${page}`,
          enabled: !!logdata,
          ...logdata
        },
        mobile: {
          logo,
          theme: mobileDefaultTheme,
          navigation: {
            ...mobileNavigation,
            current: "trip"
          }
        },
        desktop: {
          theme: isWhite ? desktopWhiteTheme : desktopDefaultTheme,
          logo: {
            ...logo,
            isWhite
          },
          navigation: {
            ...desktopNavigation,
            current: "trip"
          },
          topLinks: {
            showOrders: false
          }
        },
        emitter: emitter,
        routeConfig: {
          baseDomain: "tutu.ru"
        },
        isMainHeadLine: false,
        authParams: {
          ...config.get("auth").toJS(),
          isAuthorized: user.get("isAuthorized")
        },
        userInfo: {
          username: user.get("username")
        },
        ...rest
      };

    return (
      <div data-web-view-remove="hat">
        <ThemeProvider theme={isDesktop ? params.desktop.theme : params.mobile.theme}>
          <AdaptiveHat
            {...rest}
            {...params}
          />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {
    user: getUser(state),
    config: getConfig(state),
    isDesktop: getIsDesktop(state)
  };
};

const mapDispatchToProps = {
  login,
  logout,
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(View);
