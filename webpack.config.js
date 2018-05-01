/*
Documentation
*/
var webpack = require("webpack");
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body'
})

const CleanWebpackPlugin = require('clean-webpack-plugin') // Remove old hashed js files on rebuilding

module.exports = {
  entry: 'index.js',
  context: __dirname + "/client", // Only for entry points, not for modules.
  resolve: {
    modules: ['node_modules', 'client', 'client/components'],
    extensions: ['.js', '.jsx', '.css']
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.[chunkhash].js', // Add hash to file to avoid caching.
    publicPath: ''
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
        "_": "lodash",
    }),
    new CleanWebpackPlugin(["dist"]), // Remove old hashed js files on rebuilding.
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080
  },
 devtool: 'inline-source-map'

}
