var config = require('../../config');
var proxyMiddleware = require('http-proxy-middleware');
var proxyTable = config.dev.proxyTable;

const start = function(devServer, cb) {
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
      options = {target: options};
    }
    devServer.use(proxyMiddleware(options.filter || context, options));
  });
  cb && cb();
}

module.exports = {
  start: start
}
