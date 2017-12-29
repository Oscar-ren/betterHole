var webpack = require('webpack');
var config = require('../index');
var merge = require('webpack-merge');
var utils = require('../utils');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&quiet=true&reload=true'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: config.dev.cssSourceMap,
            localIdentName: '[name]__[local]',
            importLoaders: 1
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: config.dev.cssSourceMap,
            localIdentName: '[name]__[local]',
            importLoaders: 2
          }
        }, 'resolve-url-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: config.dev.cssSourceMap
          }
        }]
      },
    ]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.shallowStringify(config.dev.env),
      '__DEV__': true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: config.apps[process.env.APP_NAME].index
    })
  ]
});
