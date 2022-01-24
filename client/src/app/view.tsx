import * as React        from "react";
import { Helmet }        from "react-helmet";
import { State }         from 'router5';

import styles        from "./styles.less";
import favicon       from "./images/favicon.ico";
import { getComponentByRoute } from "./router/getComponentByRoute";

export type IProps = {
  meta: any;
  route: State;
};

export class View extends React.PureComponent<IProps> {
  render() {
    const { meta, route } = this.props;
    const tags = meta.get("tags");
    const links = meta.get("links");

    return (
      <>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{meta.get("title", "").replace(/&nbsp;/gi, " ")}</title>
          <meta name="description" content={meta.get("description", "").replace(/&nbsp;/gi, " ")}/>
          <meta name="keywords" content={meta.get("keywords")}/>
          <link rel="shortcut icon" type="image/x-icon" href={favicon}/>
          {
            !!tags &&
            tags.map(tag => <meta key={tag.get("property") || tag.get("name")} {...tag.toJS()}/>)
          }

          {
            !!links &&
              links.map((link,i) => <link key={i} {...link.toJS()}/>)
          }
        </Helmet>

        <div className={styles.wrp} id="__ssr__verify-layout">
          {            
            getComponentByRoute(route.name, route.meta)
          }         
        </div>
      </>
    );
  }
}
