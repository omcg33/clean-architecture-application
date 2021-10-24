const path = require("path");
// const autoprefixer              = require("autoprefixer");
const ReactLoadableSSRAddon = require("react-loadable-ssr-addon");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin      = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const BundleSizeAnalyzerPlugin  = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const webpack = require('webpack');

const DIRS = require('./consts').DIRS;
const PATHS = require('./consts').PATHS;

module.exports = (env, argv) => {
  const { mode, analyze } = argv;
  const isProduction = mode === "production";

  let additionalPlugins = [];

  // if (!!analyze) {
  //   additionalPlugins = additionalPlugins.concat([
  //     new BundleSizeAnalyzerPlugin(
  //       "../analyze/bundle-size-report.txt"
  //     ),
  //     new BundleAnalyzerPlugin({
  //       analyzerMode: "static",
  //       reportFilename: "../analyze/report.html",
  //       openAnalyzer: true
  //     })
  //   ]);
  // }
  
  return {
    // The main entry point of the application
    entry: {
      index: ["babel-polyfill", DIRS.INPUT_PATH]
    },

    optimization: {
      splitChunks: {
        maxInitialRequests: 5,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: -20,
          },
          common: {
            name: "common",
            chunks: "all",
            minChunks: 2,
            priority: -30,
          }
        }
      },
    },

    // The main entry point source/client/index.tsx
    // Main entry point plus each dynamic import generate a bundle
    // Ex: import(/* webpackChunkName: "about" */ "../pages/about") generate about.js
    output: {
      path: DIRS.DIST.JS,
      filename: isProduction ? "[name].js?[contenthash:10]" : "[name].js",
      chunkFilename: isProduction ? "[name].js?[contenthash:10]" : "[name].js",
      publicPath: PATHS.STATIC
    },

    watchOptions: {
      aggregateTimeout: 1000,
      poll: 300,
      ignored: DIRS.NODE_MODULES
    },

    // Source files take into account
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".less"]
    },

    // Plugins in charge to transform the source code
    // Rules are applied from right to left (ts-loader then babel-loader)
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|ico)$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: path.relative(DIRS.DIST.JS, path.join(DIRS.DIST.IMAGES, "[sha512:hash:base64:7].[ext]?[hash:10]") )
          }
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              loader: "svg-inline-loader",
              resourceQuery: /^\?raw$/,
              options: {
                idPrefix: true
              }
            },
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                name: path.relative(DIRS.DIST.JS, path.join(DIRS.DIST.IMAGES, "[sha512:hash:base64:7].[ext]?[hash:10]") )
              }
            },
          ]
        },
        {
          test: /\.(woff|ttf)$/,
          loader: "url-loader",
          options: {
            limit: 25000,
            name: path.relative(DIRS.DIST.JS, path.join(DIRS.DIST.FONTS, "[sha512:hash:base64:7].[ext]?[hash:10]") )
          }
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            // 2. babel-preset-react transform React jsx and babel-preset-env es2015 syntax into code understandable by the browser
            //    syntax-dynamic-import allow babel to parse dynamic import syntax but not transform it
            //    react-loadable/babel declare wich modules are being loaded
            {
              loader: "babel-loader",
              options: {
                babelrc: false,
                presets: [
                  "@babel/preset-react",
                  [
                    "@babel/preset-env",
                    {
                      modules: false
                    }
                  ]
                ],
                plugins: ["syntax-dynamic-import", "react-loadable/babel"]
              }
            },
            // 1. TypeScript type check and emit JavaScript es2015 (TypeScript without types) consumable by Babel
            {
              loader: "awesome-typescript-loader",
              options: {
                configFileName: require.resolve("../tsconfig.json"),
                context: __dirname
              }
            }
          ]
        },
        {
          test: /\.(c|le)ss/,
          include: [DIRS.INPUT_PATH],
          oneOf: [
            {
              resourceQuery: /^\?raw$/,
              use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    localIdentName: "[hash:base64:7]___[local]",
                    modules: true,
                    importLoaders: 1
                  }
                },
                // {
                //   loader: "postcss-loader",
                //   options: {
                //     options: {},
                //     plugins: [
                //       autoprefixer({
                //         browsers: ["last 2 version"]
                //       })
                //     ]
                //   }
                // },
                "less-loader"
              ]
            }
          ]
        }
      ]
    },

    // React Loadable generate stats for mapping modules to bundle
    // This file is used on server side rendering to determine which bundle need to be load
    // Webpack build server and client simultaneously so we need to commit reactLodable.json in source
    // this way Webpack will always find the file when the server build append before client
    plugins: [
      new ReactLoadableSSRAddon({
        filename: path.join(DIRS.DIST.INDEX, "reactLoadable.json")
      }),
      // new webpack.DllReferencePlugin({
      //   context: __dirname,
      //   manifest: path.join(DIRS.STATIC.DLL, "/manifest.dll.json")
      // }),
      new MiniCssExtractPlugin({
        filename: path.relative(DIRS.DIST.JS, path.join(DIRS.DIST.CSS, mode === "production" ? "[name].css?[contenthash:10]" : "css/[name].css") )
      }),
      new CopyWebpackPlugin([
        {
          from: DIRS.STATIC.IMAGES,
          to: path.relative(DIRS.DIST.JS, DIRS.DIST.IMAGES),
          test: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/
        },
      ]),
      ...additionalPlugins
    ]
  };
};
