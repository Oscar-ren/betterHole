const express = require('express');
const path = require('path');
// const compression = require('compression');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(compression());
// app.use(cookieParser());
app.use(express.static(path.resolve('dist/mobile'), {extensions: ['html']}));
app.use('/assets', express.static(path.join(__dirname, 'dist/mobile/assets')));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server listening on port ${process.env.PORT || 3000}`);
  }
});

module.exports = app;
