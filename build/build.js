require('./services/checkVersion')();
require('./services/checkEnv')();
require('./services/checkParam')();

var config = require('../config/index');
var webpackConfig = require('../config/webpack/webpack.prod.conf');
process.env.NODE_ENV = config.build.env.NODE_ENV;

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var fs = require('fs-extra')
var spinner = ora('building for production...').start();

rm(path.join(config.build.outputPath, process.env.APP_NAME, config.build.assetsDirectory), err => {
  if (err) throw err;
  var compiler = webpack(webpackConfig);
  compiler.run(function (err, stats) {
    if (err) throw err;
    fs.copySync(path.resolve('assets'), path.resolve(config.build.outputPath, process.env.APP_NAME, config.build.assetsDirectory));
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    spinner.succeed('  Build complete.\n');
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});
