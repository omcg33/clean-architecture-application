import React        from "react";
import { Helmet }        from "react-helmet";
import {
  Routes,
  Route,
} from "react-router-dom";

import styles        from "./styles.less";
import favicon       from "./images/favicon.ico";
import { getRoutes } from "./router/routes";

export type IProps = {
  meta: any;
};

export const View = (props: IProps) =>  {
    const { meta } = props;
    const tags = meta.get("tags");
    const links = meta.get("links");
    const routes = getRoutes();
    
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

        <div className={styles.wrp}>
          <Routes>
            {routes.map((route, i) => (
              <Route key={(route.path || "*").toString()} {...route} />
            ))}
          </Routes>  
        </div>
      </>
    );
  }
