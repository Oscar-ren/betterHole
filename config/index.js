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
    host: '127.0.0.1',
    cssModulesExclude: [/node_modules/],
    cssSourceMap: false,
    staticPath: 'assets',
    port: 9000,
    proxyTable: {
      '/v1': {
        target: 'http://localhost:8090'
      }
    }
  }
};
