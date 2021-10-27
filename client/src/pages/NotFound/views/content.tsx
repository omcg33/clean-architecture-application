import * as React from "react";
import { Link }   from "react-router-dom";
import { PAGES_URL_ALIASES } from "../../../../../consts";
import { generatePageUrl } from "../../../app/routes";



import styles              from "./styles.less";

class Content extends React.PureComponent<any> {
  render() {
    // const { isDesktop } = this.props;

    return (
      <>
        <div className={styles.container}>
          <div>
            <div>
              404
            </div>
            <div>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
                Список кошечек
              </Link>
            </div>
            <div>
              <Link to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
                Список собачек
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Content;

