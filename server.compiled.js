"use strict";

var express = require('express');

var path = require('path');

var fetch = require('node-fetch');

require('dotenv').config();

var PORT = process.env.HTTP_PORT || 4001;

var fs = require('fs');

var app = express(); //serve static files//

app.use(express["static"]('public')); //start fetch data//

app.get('/', function (req, res) {
  res.sendFile('index.html');
}); //server map-app//
// app.use(express.static(path.join(__dirname, 'map-widget', 'build')))
// Serve map widget

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

app.get('/:prov/overallresults', function (req, res) {
  var prov = 'nb';

  if (req.params.prov) {
    prov = req.params.prov;
  }

  var results = fs.readFileSync("public/".concat(prov, "/data/").concat(prov, "_overall.json"));
  res.send(JSON.parse(results));
});
app.get('/:prov/fullresults', function (req, res) {
  var prov = 'nb';

  if (req.params.prov) {
    prov = req.params.prov;
  }

  var results = fs.readFileSync("public/".concat(prov, "/data/").concat(prov, "_results.json"));
  res.send(JSON.parse(results));
});
app.get('/:prov/declaration', function (req, res) {
  var prov = 'nb';

  if (req.params.prov) {
    prov = req.params.prov;
  }

  var results = fs.readFileSync("public/".concat(prov, "/data/").concat(prov, "_declaration.json"));
  res.send(JSON.parse(results));
});
app.get('/:prov/geojson', function (req, res) {
  var prov = 'nb';

  if (req.params.prov) {
    prov = req.params.prov;
  }

  var geo = fs.readFileSync("public/".concat(prov, "/data/").concat(prov, "_geo.json"));
  res.send(JSON.parse(geo));
});
app.get('/:prov/config', function (req, res) {
  var prov = 'nb';

  if (req.params.prov) {
    prov = req.params.prov;
  }

  var file = fs.readFileSync("public/".concat(prov, "/data/").concat(prov, "_config.json"));
  res.send(JSON.parse(file));
});
app.get('/testEnv', function (req, res) {
  res.send(process.env.TEST_TEXT || "Test text not found");
});
app.get('/:prov/testData', function (req, res) {
  console.log(req.params);
  var file = fs.readFileSync('public/data/test.json');

  if (req.params.prov) {
    console.log(req.params.prov);
    var prov = req.params.prov;
    file = fs.readFileSync("public/".concat(prov, "/data/").concat(prov, "_test.json"));
  }

  res.send(JSON.parse(file));
});
app.get('*/image/:prov/:filename', function (req, res) {
  var filename = req.params.filename.slice(0, -4);
  var prov = req.params.prov;
  var image = "/".concat(prov, "/headshots/").concat(filename, ".jpg");

  if (filename === "D'AMOURS_JC_LIB_48") {
    console.log('true');
    image = "/".concat(prov, "/headshots/DAMOURS_Jc_LIB_48.jpg");
  }

  res.redirect(image);
});

function startTimer(req, res, next) {
  console.log("Server test listening at port ".concat(PORT, "."));
  var update_elections = process.env.UPDATE_ELECTIONS.split(','); // getPartyData();

  console.log(update_elections);
  update_elections.map(function (election) {
    console.log('map party data', election.toLowerCase().trim());
    var prov = election.toLowerCase().trim();
    getPartyData(prov);
    setInterval(function () {
      console.log("getting party data");
      getPartyData(prov);
    }, process.env.TIMER || 600000);
  });
} //get party data


function getPartyData(prov) {
  if (prov) {
    console.log('get party data', prov);
    var datapath = process.env.DATA_PATH || 'https://election-touchscreen.globalnews.ca/data/';
    var resultsurl = process.env.RESULTSURL || "".concat(datapath).concat(prov, "_full_2020.json");
    var overallurl = process.env.OVERALLURL || "".concat(datapath).concat(prov, "_overall.json");
    var declarationurl = process.env.DECLARATIONURL || "".concat(datapath).concat(prov, "_declaration.json");
    console.log(resultsurl);
    fetch(overallurl).then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }).then(function (json) {
      if (json) {
        var finished = function finished(err) {
          console.log('finished fetching ' + prov + ' overall data');
        };

        var data = JSON.stringify(json);
        fs.writeFile("public/".concat(prov, "/data/").concat(prov, "_overall.json"), data, finished);
      }
    });
    fetch(resultsurl).then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }).then(function (json) {
      if (json) {
        var finished = function finished(err) {
          console.log('finished fetching ' + prov + ' full data');
        };

        var data = JSON.stringify(json);
        fs.writeFile("public/".concat(prov, "/data/").concat(prov, "_results.json"), data, finished);
      }
    });
    console.log(declarationurl);
    fetch(declarationurl).then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }).then(function (json) {
      if (json) {
        var finished = function finished(err) {
          console.log('finished fetching ' + prov + ' declaration data');
        };

        var data = JSON.stringify(json);
        fs.writeFile("public/".concat(prov, "/data/").concat(prov, "_declaration.json"), data, finished);
      }
    });
  }
}

app.listen(PORT, startTimer); // app.listen(PORT, ()=> {
//     console.log(`Server test listening at port ${PORT}.`);
// })
