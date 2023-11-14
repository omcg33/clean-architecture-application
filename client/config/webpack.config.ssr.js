const path                  = require("path");
const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

const DIRS   = require('./consts').DIRS;
const PATHS = require('./consts').PATHS;

module.exports = (env, argv) => {
  const { mode, analyze = false } = argv;

  return {
    // Set Webpack build for Node.js
    target: "node",

    entry: [DIRS.ENTRYPOINTS.SERVER],

    // Generated bundle location
    output: {
      path: DIRS.DIST.INDEX,
      filename: "ssr.js",
      publicPath: PATHS.STATIC,     
      libraryTarget: 'commonjs'
    },

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
    // externals: [],

    devServer: {      
      hot: false,
      inline: false,
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
        // { 
        //   test: /\.json$/,
        //   exclude: /node_modules/,
        //   loader: 'json-loader',
        // },
        {
          test: /\.(jpe?g|png|gif|ico)$/,
          loader: "url-loader",
          options: { 
            limit: 10000,
            emitFile: false,
            name: path.relative(DIRS.DIST.JS, path.join(DIRS.DIST.IMAGES, "[sha512:hash:base64:7].[ext]?[hash:10]") )
           },         
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              loader: "svg-inline-loader",
              resourceQuery: /^\?raw$/,
              options: {
                idPrefix: true,
                emitFile: false,
              }
            },
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                emitFile: false,
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
            emitFile: false,
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
              loader: "ts-loader",
              options: {
                configFile: require.resolve("../tsconfig.json"),
                compilerOptions: {
                  declaration: true,
                  removeComments: true,
                }
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
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    emit: false,
                  },
                },
                "css-loader",
                "less-loader"
              ]
            },
            {
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    emit: false,
                  },
                },
                {
                  loader: "css-loader",
                  options: {
                    esModule: true,
                    modules: {
                      namedExport: true,
                      localIdentName: "[hash:base64:7]___[local]",
                    },
                  },
                },
                "less-loader"
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      new TypescriptDeclarationPlugin({
        out: 'ssr.d.ts'
      }),
      new MiniCssExtractPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new WebpackNotifierPlugin({ alwaysNotify: false, emoji: true }),
    ]
  }
};
