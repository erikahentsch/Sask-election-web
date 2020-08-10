const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config();

const PORT = process.env.HTTP_PORT || 4001;
const fs = require('fs')
const app = express();


//serve static files//
app.use(express.static('public'));

//start fetch data//
app.get('/', function (req, res) {
    res.send('Hello World!')
})

//server map-app//
app.use(express.static(path.join(__dirname, 'map-widget', 'build')))


// Server graph widget
app.use('/graph-widget/', express.static(path.join(__dirname, 'graph-widget', 'build')));
app.get('/graph-widget/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './graph-widget/build','index.html'));
})

// Server top seat widget
app.use('/top-widget/', express.static(path.join(__dirname, 'top-widget', 'build')));
app.get('/top-widget/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './top-widget/build','index.html'));
})

app.get("/static", (req, res)=> {
    let image = "<img src={'/camera.png'} />"
    res.send(image)
})

app.get('/flower', (req,res)=>{
    res.json({
        name: 'Dandelion',
        colour: 'Blue-ish'
    })
})

app.get('app2/flower', (req,res)=>{
    res.json({
        name: 'Dandelion',
        colour: 'Blue-ish'
    })
})

app.get('/testEnv', (req,res)=> {
    res.send(process.env.TEST_TEXT || "Test text not found")
});

function startTimer(req,res,next) {
    let counter = 0;
    console.log(`Server test listening at port ${PORT}.`);
    nextFunction();
    setInterval(()=>{
        console.log(counter);
        nextFunction();
        counter++;
    }, 5000)
}
const nextFunction = (req,res,next) => {
    var date = new Date();
    var test = {
        "test": 'this is also a test',
        "date": date
    }

    var data = JSON.stringify(test);

    fs.writeFile('public/data/test.json', data, finished)

    function finished(err) {
        console.log('all done')
    }
    console.log(date)
}

//get party data
function getPartyData() {
    var url = 'https://elector.blcloud.net/api/party/?json=true'

    fetch(url)
        .then(res=> {
            if (res.ok) {
                return res.json()
            } 
        })
        .then(json=>{

            var data = JSON.stringify(json)

            fs.writeFile('public/data/test.json', data, finished)
            function finished(err) {
                console.log('all done')
            }
        })

}

// app.listen(PORT, getPartyData)

// app.listen(PORT, startTimer)

app.listen(PORT, ()=> {
    console.log(`Server test listening at port ${PORT}.`);
})