const {join, resolve} = require("path");

const DIRS = {
  INPUT_PATH: join(__dirname, "../src"),
  NODE_MODULES: join(__dirname, "../node_modules"),
  STATIC: {
    IMAGES: join(__dirname, "../static/images"),
  },
  DIST: {   
    INDEX: resolve(__dirname, "../dist"), 
    JS: resolve(__dirname, "../dist/js"),
    CSS: resolve(__dirname, "../dist/css"),
    FONTS: resolve(__dirname, "../dist/fonts"),
    IMAGES: resolve(__dirname, "../dist/images"),
  }
};

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
  // VENDORS_DLL
};

