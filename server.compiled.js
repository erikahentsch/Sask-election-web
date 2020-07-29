"use strict";

var express = require('express');

var path = require('path');

var PORT = process.env.HTTP_PORT || 4001;
var app = express();
app.use(express["static"](path.join(__dirname, 'client', 'build')));
app.use('/app2/', express["static"](path.join(__dirname, 'client2', 'build')));
app.get('/app2/*', function (req, res) {
  res.sendFile(path.join(__dirname, './client2/build', 'index.html'));
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
app.get('app2/flower', function (req, res) {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish'
  });
});
app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
});
