var path = require('path');
var fs = require('fs');
var assert = require('assert');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var Module = require('module');
var MemoryFS = require('memory-fs');
var webpack = require('webpack');
var mfs = new MemoryFS();
var MockRouterStackOffset;
var server = null;

const join = path.join;

function createMockHandler (method, path, value) {
  return function mockHandler (req, res) {
    if (typeof value === 'function') {
      value(req, res);
    } else {
      res.json(value);
    }
    console.log(`[Local Mock Server] ${method.toUpperCase()} ${path}`);
  };
}

const applyMock = function (app, mockMap) {
  var jsonParser = bodyParser.json({limit: '5mb'});
  var urlencodedParser = bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
  });

  Object.keys(mockMap)
    .forEach((key) => {
      const keyParsed = parseKey(key);
      assert(!!app[keyParsed.method],
        `method of ${key} is not valid`
      );
      assert(
        typeof mockMap[key] === 'function' ||
        typeof mockMap[key] === 'object' ||
        `mock value of ${key} should be function or object, but got ${typeof mockMap[key]}`
      );

      app[keyParsed.method](
        keyParsed.path,
        jsonParser,
        urlencodedParser,
        createMockHandler(keyParsed.method, keyParsed.path, mockMap[key])
      );
    });
};

const serve = function (app, mockMap, cb) {
  // 清空mockLayers 和 proxyTableLayers
  if (app._router) {
    let size = app._router.stack.length;
    app._router.stack.splice(MockRouterStackOffset, size);
  }

  applyMock(app, mockMap);
  cb && cb();
};

// 初始化webpackCompiler
function transpile (app, cb) {

  var mockEntry = './test/mock/' + process.env.APP_NAME + '/index.js';
  if (!fs.existsSync(mockEntry)) {
    console.log(chalk.red('Mock 文件不存在，请创建 ' + mockEntry + ' 文件'));
    process.exit(0);
  }

  var compiler = webpack({
    entry: mockEntry,
    output: {
      filename: 'mock.config.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/
      }]
    }
  });
  compiler.outputFileSystem = mfs;

  const compilationCb = function (error, stats) {
    if (error) {
      console.log(chalk.red(error));
      return;
    }
    if (stats.hasErrors()) {
      const errors = stats.compilation ? stats.compilation.errors : null;
      console.log(chalk.red(errors));
      return;
    }
    const {compilation} = stats;
    // Get the list of files.
    const files = Object.keys(compilation.assets);
    // Read each file and compile module
    const {outputPath} = compiler;
    const configs = files.reduce((obj, file) => {
      // Get the code for the module.
      const path = join(outputPath, file);
      const src = mfs.readFileSync(path, 'utf8');
      const m = new Module();
      m.paths = module.paths;
      // Compile it into a node module!
      m._compile(src, path);
      // Add the module to the object.
      obj[file] = m.exports;
      return obj;
    }, {});

    const base = compiler.options.output.filename;
    const config = configs[base];
    const mockMap = config.default || {};

    serve(app, mockMap, cb);
  };

  compiler.watch({
    aggregateTimeout: 300
  }, compilationCb);
}

function parseKey (key) {
  // @see http://expressjs.com/zh-cn/4x/api.html#app.METHOD
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return {method, path};
}

const start = function (app, cb) {
  MockRouterStackOffset = app._router.stack.length;
  transpile(app, cb);
};

module.exports = {
  start: start,
  close: function () {
    server.close();
  }
};
