const {join} = require("path");

const DIRS = {
  INPUT_PATH: join(__dirname, "../src"),
  // NPM_COMPONENTS: join(__dirname, "../node_modules", "@tutu*"),
  NODE_MODULES: join(__dirname, "../node_modules"),
  STATIC: {
    IMAGES: join(__dirname, "../static/images"),
  },
  DIST: {    
    JS: join(__dirname, "../dist/js"),
    CSS: join(__dirname, "../dist/css"),
    IMAGES: join(__dirname, "../dist/images"),
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

