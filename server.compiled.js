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
});
app.get('*/overallresults', function (req, res) {
  var results = fs.readFileSync('public/data/overallResults.json');
  res.send(JSON.parse(results));
});
app.get('*/results_2016', function (req, res) {
  var results = fs.readFileSync('public/data/SASK_2016.json');
  res.send(JSON.parse(results));
});
app.get('*/partylist', function (req, res) {
  var results = fs.readFileSync('public/data/partylist.json');
  res.send(JSON.parse(results));
});
app.get('/testEnv', function (req, res) {
  res.send(process.env.TEST_TEXT || "Test text not found");
});

function startTimer(req, res, next) {
  var counter = 0;
  console.log("Server test listening at port ".concat(PORT, "."));
  nextFunction();
  setInterval(function () {
    console.log(counter);
    nextFunction();
    counter++;
  }, 5000);
}

var nextFunction = function nextFunction(req, res, next) {
  var date = new Date();
  var test = {
    "test": 'this is also a test',
    "date": date
  };
  var data = JSON.stringify(test);
  fs.writeFile('public/data/test.json', data, finished);

  function finished(err) {
    console.log('all done');
  }

  console.log(date);
}; //get party data


function getPartyData() {
  var url = 'https://elector.blcloud.net/api/party/?json=true';
  fetch(url).then(function (res) {
    if (res.ok) {
      return res.json();
    }
  }).then(function (json) {
    var data = JSON.stringify(json);
    fs.writeFile('public/data/test.json', data, finished);

    function finished(err) {
      console.log('all done');
    }
  });
} // app.listen(PORT, getPartyData)
// app.listen(PORT, startTimer)


app.listen(PORT, function () {
  console.log("Server test listening at port ".concat(PORT, "."));
});
