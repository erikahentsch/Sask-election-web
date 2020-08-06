var express = require('express')
var app = express()

const startTimer = (req,res,next) => {
    let counter = 0;
    setInterval(()=>{
        console.log(counter);
        testFunction;
        counter++;
    }, 1000)
    
}

var myLogger = function(req,res,next) {
    console.log("Logged");
    next();
}

var testFunction = function(req,res,next) {
    console.log('nextfunction');
}

module.exports = {
    startTimer,
    myLogger,
    testFunction,
    
}