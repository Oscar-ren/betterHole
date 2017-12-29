var path = require('path')
var config = require('./index')
var isProduction = process.env.NODE_ENV === 'production';

exports.assetsPath = function (_path) {
  var assetsDirectory = config.build.assetsDirectory;
  return path.posix.join(assetsDirectory, _path);
};

exports.shallowStringify = function (obj) {
  if(Object.prototype.toString.call(obj) !== "[object Object]") {
    throw new Error("shallowStringify 要求参数为 Object");
  }
  let newObj = {};
  for (let key in obj) {
    newObj[key] = JSON.stringify(obj[key]);
  }
  return newObj;
};

exports.vueLoaderOptions = {
  extractCSS: isProduction
};
