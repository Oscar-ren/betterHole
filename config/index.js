var path = require('path');
var prodEnv = require('./env/prod.env.js');
var devEnv = require('./env/dev.env.js');

module.exports = {
  apps: {
    mobile: {
      entry: './src/index.js',
      index: './src/index.html'
    }
  },
  build: {
    env: prodEnv,
    outputPath: 'dist',
    assetsDirectory: 'assets',
    productionSourceMap: false,
  },
  dev: {
    env: devEnv,
    alias: {
      '$common': path.resolve('src/common'),
      '$server': path.resolve('src/systems/foreground/server'),
    },
    autoOpenBrowser: true,
    // Set host if autoOpenBrowser is true
    host: 'w.flow.360es.cn',
    cssModulesExclude: [/node_modules/],
    cssSourceMap: false,
    staticPath: 'assets',
    port: 8090,
    proxyTable: {
      '/api/v1': {
        secure: false,
        target: `http://${devEnv.API_HOST}/`,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};
