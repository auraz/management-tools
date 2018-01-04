/*
Documentation
*/
var webpack = require("webpack");
const path = require('path');

if (typeof process.env.DOCKER === undefined) {
  var GitBranch = { sync: () => "" } // mock git-branch module
} else {
  var GitBranch = require('git-branch');
}

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
        "git_branch": "git-branch",
        "_": "lodash",
    }),
    new CleanWebpackPlugin(["dist"]), // Remove old hashed js files on rebuilding.
    new webpack.DefinePlugin({
            'git': {
                'branch': JSON.stringify(GitBranch.sync())  // Used in App.jsx to generalize output for gh-pages.
            }
        })
    ],
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 8080
    }
}

if (GitBranch.sync().includes('gh-pages')) {
    module.exports['output']['publicPath'] =  '/management-tools/dist' // Url in gh-pages is relative to repo.
    process.stdout.write("\nUpdated config for gh-pages.\n");
}
