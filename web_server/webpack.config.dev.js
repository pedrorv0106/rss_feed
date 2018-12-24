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
            loader: 'file-loader',
            options: {
              publicPath: '/'
            }
          }
        ]
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