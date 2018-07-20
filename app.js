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
    "status": 0,
    "message": "success",
    "result": [
      {
        "toilet_id": 1,
        "toilet_type": "male",
        "building": "A",
        "floor": 1,
        "ext_info": ""
      },
      {
        "toilet_id": 39,
        "toilet_type": "male",
        "building": "B",
        "floor": 1,
        "ext_info": ""
      },
      {
        "toilet_id": 3,
        "toilet_type": "male",
        "building": "A",
        "floor": 2,
        "ext_info": ""
      },
      {
        "toilet_id": 7,
        "toilet_type": "male",
        "building": "A",
        "floor": 2,
        "ext_info": ""
      },
      {
        "toilet_id": 41,
        "toilet_type": "male",
        "building": "B",
        "floor": 2,
        "ext_info": ""
      },
      {
        "toilet_id": 45,
        "toilet_type": "male",
        "building": "B",
        "floor": 2,
        "ext_info": ""
      },
      {
        "toilet_id": 5,
        "toilet_type": "male",
        "building": "A",
        "floor": 3,
        "ext_info": ""
      },
      {
        "toilet_id": 9,
        "toilet_type": "male",
        "building": "A",
        "floor": 3,
        "ext_info": ""
      },
      {
        "toilet_id": 43,
        "toilet_type": "male",
        "building": "B",
        "floor": 3,
        "ext_info": ""
      },
      {
        "toilet_id": 47,
        "toilet_type": "male",
        "building": "B",
        "floor": 3,
        "ext_info": ""
      },
      {
        "toilet_id": 11,
        "toilet_type": "male",
        "building": "A",
        "floor": 4,
        "ext_info": ""
      },
      {
        "toilet_id": 49,
        "toilet_type": "male",
        "building": "B",
        "floor": 4,
        "ext_info": ""
      },
      {
        "toilet_id": 13,
        "toilet_type": "male",
        "building": "A",
        "floor": 5,
        "ext_info": ""
      },
      {
        "toilet_id": 51,
        "toilet_type": "male",
        "building": "B",
        "floor": 5,
        "ext_info": ""
      },
      {
        "toilet_id": 15,
        "toilet_type": "male",
        "building": "A",
        "floor": 6,
        "ext_info": ""
      },
      {
        "toilet_id": 53,
        "toilet_type": "male",
        "building": "B",
        "floor": 6,
        "ext_info": ""
      },
      {
        "toilet_id": 17,
        "toilet_type": "male",
        "building": "A",
        "floor": 7,
        "ext_info": ""
      },
      {
        "toilet_id": 55,
        "toilet_type": "male",
        "building": "B",
        "floor": 7,
        "ext_info": ""
      },
      {
        "toilet_id": 19,
        "toilet_type": "male",
        "building": "A",
        "floor": 8,
        "ext_info": ""
      },
      {
        "toilet_id": 57,
        "toilet_type": "male",
        "building": "B",
        "floor": 8,
        "ext_info": ""
      },
      {
        "toilet_id": 21,
        "toilet_type": "male",
        "building": "A",
        "floor": 9,
        "ext_info": ""
      },
      {
        "toilet_id": 59,
        "toilet_type": "male",
        "building": "B",
        "floor": 9,
        "ext_info": ""
      },
      {
        "toilet_id": 23,
        "toilet_type": "male",
        "building": "A",
        "floor": 10,
        "ext_info": ""
      },
      {
        "toilet_id": 61,
        "toilet_type": "male",
        "building": "B",
        "floor": 10,
        "ext_info": ""
      },
      {
        "toilet_id": 25,
        "toilet_type": "male",
        "building": "A",
        "floor": 11,
        "ext_info": ""
      },
      {
        "toilet_id": 63,
        "toilet_type": "male",
        "building": "B",
        "floor": 11,
        "ext_info": ""
      },
      {
        "toilet_id": 27,
        "toilet_type": "male",
        "building": "A",
        "floor": 12,
        "ext_info": ""
      },
      {
        "toilet_id": 65,
        "toilet_type": "male",
        "building": "B",
        "floor": 12,
        "ext_info": ""
      },
      {
        "toilet_id": 29,
        "toilet_type": "male",
        "building": "A",
        "floor": 13,
        "ext_info": ""
      },
      {
        "toilet_id": 67,
        "toilet_type": "male",
        "building": "B",
        "floor": 13,
        "ext_info": ""
      },
      {
        "toilet_id": 31,
        "toilet_type": "male",
        "building": "A",
        "floor": 14,
        "ext_info": ""
      },
      {
        "toilet_id": 69,
        "toilet_type": "male",
        "building": "B",
        "floor": 14,
        "ext_info": ""
      },
      {
        "toilet_id": 33,
        "toilet_type": "male",
        "building": "A",
        "floor": 15,
        "ext_info": ""
      },
      {
        "toilet_id": 71,
        "toilet_type": "male",
        "building": "B",
        "floor": 15,
        "ext_info": ""
      },
      {
        "toilet_id": 35,
        "toilet_type": "male",
        "building": "A",
        "floor": 16,
        "ext_info": ""
      },
      {
        "toilet_id": 73,
        "toilet_type": "male",
        "building": "B",
        "floor": 16,
        "ext_info": ""
      },
      {
        "toilet_id": 37,
        "toilet_type": "male",
        "building": "A",
        "floor": 17,
        "ext_info": ""
      },
      {
        "toilet_id": 75,
        "toilet_type": "male",
        "building": "B",
        "floor": 17,
        "ext_info": ""
      }
    ]
  })
})

app.get('/v1/stalls', function(req, res) {
  res.json({
    "status": 0,
    "message": "success",
    "result": [
      {
        "stall_id": 230,
        "toilet_id": 1,
        "stall_seq": 1,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-22 17:49:53"
      },
      {
        "stall_id": 231,
        "toilet_id": 1,
        "stall_seq": 2,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 232,
        "toilet_id": 1,
        "stall_seq": 3,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 233,
        "toilet_id": 1,
        "stall_seq": 4,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 234,
        "toilet_id": 2,
        "stall_seq": 1,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 235,
        "toilet_id": 2,
        "stall_seq": 2,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 236,
        "toilet_id": 2,
        "stall_seq": 3,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 237,
        "toilet_id": 2,
        "stall_seq": 4,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 238,
        "toilet_id": 3,
        "stall_seq": 1,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 239,
        "toilet_id": 3,
        "stall_seq": 2,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 240,
        "toilet_id": 3,
        "stall_seq": 3,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 241,
        "toilet_id": 3,
        "stall_seq": 4,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 242,
        "toilet_id": 4,
        "stall_seq": 1,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 243,
        "toilet_id": 4,
        "stall_seq": 2,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 244,
        "toilet_id": 4,
        "stall_seq": 3,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 245,
        "toilet_id": 4,
        "stall_seq": 4,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 246,
        "toilet_id": 5,
        "stall_seq": 1,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 247,
        "toilet_id": 5,
        "stall_seq": 2,
        "stall_state": "occupied",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 248,
        "toilet_id": 5,
        "stall_seq": 3,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      },
      {
        "stall_id": 249,
        "toilet_id": 5,
        "stall_seq": 4,
        "stall_state": "vacant",
        "last_modified_time": "2017-11-21 15:56:18"
      }
    ]
  })
})

// app.use(compression());
// app.use(cookieParser());
app.use(express.static(path.resolve('dist/mobile'), {extensions: ['html']}));
app.use('/assets', express.static(path.join(__dirname, 'dist/mobile/assets')));

app.listen(process.env.PORT || 8090, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server listening on port ${process.env.PORT || 8090}`);
  }
});

module.exports = app;
