require('./services/checkVersion')();
require('./services/checkEnv')();
require('./services/checkParam')();

var config = require('../config/index');
var webpackConfig = require('../config/webpack/webpack.dev.conf');
process.env.NODE_ENV = config.dev.env.NODE_ENV;

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var chalk = require('chalk');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var historyFalllback = require('connect-history-api-fallback');
var proxyService = require('./services/proxyService');
var app = express();

// handle fallback for HTML5 history API
app.use(historyFalllback({
  verbose: true
}));

var compiler = webpack(webpackConfig);
var port = process.env.PORT || config.dev.port;
var protocol = config.dev.https ? 'https' : 'http';
var hostname = config.dev.host && config.dev.host.split('/')[0];
var uri = `${protocol}://${hostname}:${port}`;
var autoOpenBrowser = config.dev.autoOpenBrowser;
var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  index: 'index.html',
  stats: 'minimal'
});

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  autoOpenBrowser && opn(uri);
  _resolve();
});

app.use(devMiddleware);

var hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
});

// enable hot-reload and state-preserving
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join('/', config.dev.staticPath || 'assets');
app.use(staticPath, express.static(config.dev.staticPath || 'assets'));

if (config.dev.env.USE_LOCAL_MOCK_SERVER) {
  var localmock = require('./services/localMockService');
  localmock.start(app, function () {
    proxyService.start(app);
    console.log('✅ 本地 Mock 数据配置完成');
  });
} else {
  proxyService.start(app, function () {
    console.log('✅ 远端代理配置完成');
  });
}

var server = app.listen(port);

console.log('> Starting dev server...');

process
  .on('uncaughtException', (err) => {
    console.log(chalk.red(`Caught exception: ${err}\n`));
  })
  .on('SIGINT', function () {
    process.exit(0);
  });

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};

