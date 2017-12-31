const express = require('express');
const path = require('path');
// const compression = require('compression');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const historyFalllback = require('connect-history-api-fallback');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(historyFalllback());

app.get('/v1/toilets', function(req, res) {
  res.json({
    'status': 0,
    'message': 'success',
    'result': {
      1: [
        {
          'toilet_id': 1,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 1,
          'ext_info': ''
        },
        {
          'toilet_id': 23,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 10,
          'ext_info': ''
        },
        {
          'toilet_id': 25,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 11,
          'ext_info': ''
        },
        {
          'toilet_id': 27,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 12,
          'ext_info': ''
        },
        {
          'toilet_id': 29,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 13,
          'ext_info': ''
        },
      ],
      2: [
        {
          'toilet_id': 3,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 2,
          'ext_info': ''
        },
        {
          'toilet_id': 7,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 2,
          'ext_info': ''
        },
      ],
      3: [
        {
          'toilet_id': 5,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 3,
          'ext_info': ''
        },
        {
          'toilet_id': 9,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 3,
          'ext_info': ''
        },
      ],
      4: [{
        'toilet_id': 11,
        'toilet_type': 'male',
        'building': 'A',
        'floor': 4,
        'ext_info': ''
      }],
      5: [{
        'toilet_id': 13,
        'toilet_type': 'male',
        'building': 'A',
        'floor': 5,
        'ext_info': ''
      }],
      6: [{
        'toilet_id': 15,
        'toilet_type': 'male',
        'building': 'A',
        'floor': 6,
        'ext_info': ''
      }],
      7: [{
        'toilet_id': 17,
        'toilet_type': 'male',
        'building': 'A',
        'floor': 7,
        'ext_info': ''
      },
        {
          'toilet_id': 19,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 8,
          'ext_info': ''
        },
        {
          'toilet_id': 21,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 9,
          'ext_info': ''
        }],
      8: [ {
        'toilet_id': 31,
        'toilet_type': 'male',
        'building': 'A',
        'floor': 14,
        'ext_info': ''
      },
        {
          'toilet_id': 33,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 15,
          'ext_info': ''
        },
        {
          'toilet_id': 35,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 16,
          'ext_info': ''
        },
        {
          'toilet_id': 37,
          'toilet_type': 'male',
          'building': 'A',
          'floor': 17,
          'ext_info': ''
        }]
    }
  })
})

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
