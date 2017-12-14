/*
    ./webpack.config.js
*/

var webpack = require("webpack");

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})


module.exports = {
  entry: './index.js',
  context: __dirname + "/client",
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.json$/, loader: 'json' },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new  webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "Tether": 'tether',
        "JSON": 'JSON',
    }),
    ],
    devServer: {
      historyApiFallback: true,
    }
}

