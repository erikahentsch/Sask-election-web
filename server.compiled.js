"use strict";

var express = require('express');

var path = require('path');

var PORT = process.env.HTTP_PORT || 4001;
var app = express();
app.use(express["static"](path.join(__dirname, 'client', 'build')));
app.use('static', express["static"](path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.send('flowers smell nice');
});
app.get("/static", function (req, res) {
  var image = "<img src={'/camera.png'} />";
  res.send(image);
});
app.get('/flower', function (req, res) {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish'
  });
});
app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
});
