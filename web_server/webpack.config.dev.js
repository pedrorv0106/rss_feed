'use strict'
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'development',
  entry: [
    './views/main.js',
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader/url',
          {
            loader: "file-loader",
            options: {
              publicPath: '/',
              name: 'css/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "file-loader?name=/imgs/[name].[ext]"
      },
      {
        test: /\.(ttf|woff2|woff|eot)$/,
        loader: "file-loader?name=/fonts/[name].[ext]"
      },
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}