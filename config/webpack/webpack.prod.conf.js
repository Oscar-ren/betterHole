var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('../utils');
var config = require('../index');
var baseWebpackConfig = require('./webpack.base.conf.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var webpackConfig = merge.smart(baseWebpackConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract([{
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: '[name]__[local]',
          sourceMap: config.build.productionSourceMap
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: config.build.productionSourceMap
        }
      }]),
      exclude: config.dev.cssModulesExclude
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(['css-loader']),
      include: config.dev.cssModulesExclude
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]',
            sourceMap: config.build.productionSourceMap
          }
        }, 'resolve-url-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: config.build.productionSourceMap
          }
        }]
      })
    }]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: path.resolve(config.build.outputPath, process.env.APP_NAME),
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.shallowStringify(config.build.env),
      '__DEV__': false
    }),
    new UglifyJsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.apps[process.env.APP_NAME].index,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.resolve('node_modules')
          ) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
});

// `npm run build --report`
if (process.env.npm_config_report) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
