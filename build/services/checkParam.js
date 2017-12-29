var chalk = require('chalk');

var config = require('../../config/index');
var devEnv = require('../../config/env/dev.env');
var argv = require('minimist')(process.argv.slice(2));
var appName = process.env.npm_config_app && argv._[0] || devEnv.DEFAULT_APP;

module.exports = function() {
  if(!appName) {
    console.log(chalk.red(
      '\n' +
      '  Error: 请配置需要打包的 app 名字 \n' +
      '  使用 npm run dev/build --app appName 指定或在 config/env/dev.env.js 中指定默认 app \n'
    ));
    process.exit(1);
  } else if (!config.apps[appName]) {
    console.log(chalk.red(
      '\n' +
      '  Error: app 不存在 \n' +
      '  请检查指定 app 是否在 config/index.js 中配置 \n'
    ));
    process.exit(1);
  }
  process.env.APP_NAME = appName;
}
