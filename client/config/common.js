module.exports = {
  rules: [
    {
      test: /\.(jpe?g|png|gif)$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        name: "img/[sha512:hash:base64:7].[ext]?[hash:10]"
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
            name: "img/[sha512:hash:base64:7].[ext]?[hash:10]"
          }
        },
      ]
    },
    {
      test: /\.(woff|ttf)$/,
      loader: "url-loader",
      options: {
        limit: 25000,
        name: "fonts/[sha512:hash:base64:7].[ext]?[hash:10]"
      }
    }
  ]
};
