import React        from "react";
import { Helmet }        from "react-helmet";
import {
  Routes,
  Route,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import favicon       from "./images/favicon.ico";
import { getRoutes } from "./router/routes";
import "./styles.less";

export type IProps = {
  meta: any;
};

export const View = (props: IProps) =>  {
    const { meta } = props;
    const tags = meta.get("tags");
    const links = meta.get("links");
    const routes = getRoutes();
    
    return (
      <CssBaseline>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{meta.get("title", "").replace(/&nbsp;/gi, " ")}</title>
          <meta name="description" content={meta.get("description", "").replace(/&nbsp;/gi, " ")}/>
          <meta name="keywords" content={meta.get("keywords")}/>
          <link rel="icon" href={favicon} />
          <link rel="shortcut icon" type="image/x-icon" href={favicon}/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          {
            !!tags &&
            tags.map(tag => <meta key={tag.get("property") || tag.get("name")} {...tag.toJS()}/>)
          }

          {
            !!links &&
              links.map((link,i) => <link key={i} {...link.toJS()}/>)
          }
        </Helmet>
    
        <Routes>
          {routes.map((route, i) => (
            <Route key={(route.path || "*").toString()} {...route} />
          ))}
        </Routes>          
      </CssBaseline>
    );
  }
