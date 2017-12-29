var fs = require('fs');
var path = require('path');

module.exports = function () {

  let pathname = path.resolve('config/env/dev.env.js');
  const defaultPathname = path.resolve('config/env/dev.env.js.default');

  if (!fs.existsSync(pathname)) {
    fs.writeFileSync(pathname, fs.readFileSync(defaultPathname, 'utf8'));
    console.log('Tip: 自动生成开发环境配置文件 dev.env.js，本文件不入库，用于配置个人开发设置');
  }
}
