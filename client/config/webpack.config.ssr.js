const path                  = require("path");
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const nodeExternals         = require("webpack-node-externals");
const webpack               = require('webpack');

const DIRS   = require('./consts').DIRS;
const PATHS = require("./consts").PATHS;

module.exports = (env, argv) => {
  const { mode, analyze = false } = argv;
  const isProduction = mode === "production";

  return {
    // Set Webpack build for Node.js
    target: "node",

    optimization: {
      // We no not want to minimize our code.
      minimize: false
    },
    stats: {
      assets: true,
      chunks: true,
      colors: true,

      reasons: false,
      modules: false,
      moduleTrace: false,
      outputPath: false,
      logging: false,
      entrypoints: false,
      chunkGroups: false,
      chunkModules: false,
      chunkOrigins: false,
      moduleAssets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      warnings: false,
    },
    // Exclude node_modules except tutu from the bundle
    externals: [nodeExternals()],

    devServer: {      
      hot: false,
      inline: false,
    },
    
    entry: [DIRS.ENTRYPOINTS.SERVER],

    // Generated bundle location
    output: {
      path: DIRS.DIST.INDEX,
      filename: "server.js",
      publicPath: PATHS.STATIC
    },

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: DIRS.NODE_MODULES
    },

    // Source files take into account
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".css", ".less"]
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
          exclude: [/node_modules/, /static/],
          use: [
            // 2. babel-preset-react transform React jsx and babel-preset-env es2015 syntax into code understandable by the server
            //    dynamic-import-node transpile import() to a deferred require() for node
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
                plugins: ["dynamic-import-node", "react-loadable/babel"]
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
          oneOf: [
            {
              resourceQuery: /^\?raw$/,
              use: [
                //MiniCssExtractPlugin.loader,
                 "css-loader", "less-loader"]
            },
            {
              use: [
               // MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    localIdentName: "[hash:base64:7]___[local]",
                    modules: true,
                    importLoaders: 1
                  }
                },
                "less-loader"
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      // new MiniCssExtractPlugin({
      //   filename: "server.css",
      //   chunkFilename: "server.css",
      //   publicPath: "/css/"
      // }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })      
    ]
  }
};
