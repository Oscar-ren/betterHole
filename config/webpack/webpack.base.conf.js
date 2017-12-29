var path = require('path');
var utils = require('../utils');
var config = require('../index');
var vuxLoader = require('vux-loader')

var resolve = function (filePath) {
  return path.resolve(filePath);
};

let webpackConfig = {
  entry: {
    app: config.apps[process.env.APP_NAME].entry
  },
  output: {
    path: resolve(config.build.outputPath),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    mainFiles: ['index'],
    alias: Object.assign({
      vue$: 'vue/dist/vue.js',
      '$config': resolve('config'),
      '$src': resolve('src'),
      '$test': resolve('test')
    }, config.dev.alias)
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: utils.vueLoaderOptions
          }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-echarts')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
