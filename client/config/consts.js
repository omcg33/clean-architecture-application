const {join, resolve} = require("path");

const DIRS = {
  ENTRYPOINTS: {
    CLIENT: join(__dirname, "../src/index"),
    SERVER: join(__dirname, "../src/ssr"),
  },
  NODE_MODULES: join(__dirname, "../node_modules"),
  STATIC: {
    IMAGES: join(__dirname, "../static/images"),
  },
  DIST: {   
    INDEX: resolve(__dirname, "../dist"), 
    JS: resolve(__dirname, "../dist/static"),
    CSS: resolve(__dirname, "../dist/static/css"),
    FONTS: resolve(__dirname, "../dist/static/fonts"),
    IMAGES: resolve(__dirname, "../dist/static/images"),
  }
};

const REACT_LOADABLE_STATS = join(DIRS.DIST.INDEX, "reactLoadable.json");


const PATHS = {
  STATIC: "/" // Для правильной работы балансировщика
};

// const VENDORS_DLL = [
//   "react",
//   "react-dom",
//   "react-loadable",
//   "react-redux",
//   "react-router-dom",
//   "react-router-hash-link",
//   "react-css-themr",
//   "react-helmet",
//   "redux-saga",
//   "reselect",
//   "axios",
//   "immutable"
// ];


module.exports = {
  DIRS,
  PATHS,
  REACT_LOADABLE_STATS,
  // VENDORS_DLL
};

