"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var path = require('path');

var fetch = require('node-fetch');

var sharp = require('sharp');

require('dotenv').config();

var PORT = process.env.HTTP_PORT || 4001;

var fs = require('fs');

var app = express(); //serve static files//

app.use(express["static"]('public')); //start fetch data//

app.get('/', function (req, res) {
  res.sendFile('index.html');
}); //server map-app//

app.use(express["static"](path.join(__dirname, 'map-widget', 'build'))); // Serve map widget

app.use('/map-widget/', express["static"](path.join(__dirname, 'map-widget', 'build')));
app.get('/map-widget/*', function (req, res) {
  res.sendFile(path.join(__dirname, './map-widget/build', 'index.html'));
}); // Server graph widget

app.use('/graph-widget/', express["static"](path.join(__dirname, 'graph-widget', 'build')));
app.get('/graph-widget/*', function (req, res) {
  res.sendFile(path.join(__dirname, './graph-widget/build', 'index.html'));
}); // Server top seat widget

app.use('/top-widget/', express["static"](path.join(__dirname, 'top-widget', 'build')));
app.get('/top-widget/*', function (req, res) {
  res.sendFile(path.join(__dirname, './top-widget/build', 'index.html'));
}); // Server top barchart widget

app.use('/barchart-widget/', express["static"](path.join(__dirname, 'barchart-widget', 'build')));
app.get('/barchart-widget/*', function (req, res) {
  res.sendFile(path.join(__dirname, './barchart-widget/build', 'index.html'));
}); // Server get data files: 

app.get('*/overallresults', function (req, res) {
  var results = fs.readFileSync(process.env.OVERALLELECTIONRESULTS || 'public/data/nb_overall.json');
  res.send(JSON.parse(results));
});
app.get('*/fullresults', function (req, res) {
  var results = fs.readFileSync(process.env.FULLELECTIONRESULTS || 'public/data/nb_results_full.json');
  res.send(JSON.parse(results));
});
app.get('*/geojson', function (req, res) {
  var geo = fs.readFileSync(process.env.GEOJSON || 'public/data/nb_electoral_proj.json');
  console.log(process.env.GEOJSON);
  res.send(JSON.parse(geo));
});
app.get('*/title', function (req, res) {
  res.send(process.env.TITLE || 'New Brunswick Election 2020');
});
app.get('/testEnv', function (req, res) {
  res.send(process.env.TEST_TEXT || "Test text not found");
});
app.get('/testData', function (req, res) {
  var file = fs.readFileSync('public/data/test.json');
  res.send(JSON.parse(file));
});
app.get('*/image/:filename', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var filename, testFilename, errorImage, image;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filename = req.params.filename;
            testFilename = 'AUSTIN_Kris_PA_38';
            errorImage = '/img/images.jpg';
            console.log(filename);
            console.log("test");
            image = "/headshots/election_nb/".concat(filename);
            fs.access("public/".concat(image), function (err) {
              if (err) {
                console.log(err);
                res.redirect('/img/no_headshot.png');
              } else {
                res.redirect(image);
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

function startTimer(req, res, next) {
  console.log("Server test listening at port ".concat(PORT, "."));
  getPartyData();
  setInterval(function () {
    console.log("getting party data");
    getPartyData();
  }, process.env.TIMER || 600000);
} //get party data


function getPartyData() {
  var database = process.env.DATABASE || 'https://elector02.blcloud.net';
  var overallurl = "".concat(database, "/api/party/result/overall/(mains)/json");
  var resultsurl = "".concat(database, "/api/CandidateByRiding/?json=true");
  fetch(overallurl).then(function (res) {
    if (res.ok) {
      return res.json();
    }
  }).then(function (json) {
    var data = JSON.stringify(json);
    fs.writeFile('public/data/nb_overall.json', data, finished);

    function finished(err) {
      console.log('all done');
    }
  });
  fetch(resultsurl).then(function (res) {
    if (res.ok) {
      return res.json();
    }
  }).then(function (json) {
    var data = JSON.stringify(json);
    fs.writeFile('public/data/nb_results_full.json', data, finished);

    function finished(err) {
      console.log('all done');
    }
  });
} // app.listen(PORT, startTimer)


app.listen(PORT, function () {
  console.log("Server test listening at port ".concat(PORT, "."));
}); // const nextFunction = (req,res,next) => {
//     var date = new Date();
//     var test = {
//         "test": 'this is also a test',
//         "date": date
//     }
//     var data = JSON.stringify(test);
//     fs.writeFile('public/data/test.json', data, finished)
//     function finished(err) {
//         console.log('all done')
//     }
//     console.log(date)
// }
