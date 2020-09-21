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
    res.sendFile('index.html')
})

//server map-app//
// app.use(express.static(path.join(__dirname, 'map-widget', 'build')))


// Serve map widget
app.use('/map-widget/', express.static(path.join(__dirname, 'map-widget', 'build')));
app.get('/map-widget/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './map-widget/build','index.html'));
})

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

// Server top barchart widget
app.use('/barchart-widget/', express.static(path.join(__dirname, 'barchart-widget', 'build')));
app.get('/barchart-widget/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './barchart-widget/build','index.html'));
})

// Server get data files: 
app.get('/:prov/overallresults', (req,res)=> {
    let prov = 'nb' 
    if (req.params.prov) {
        prov = req.params.prov
    }
    let results = fs.readFileSync(`public/${prov}/data/${prov}_overall.json`)
    res.send(JSON.parse(results))
})
app.get('/:prov/fullresults', (req,res)=>{
    let prov = 'nb';
    if (req.params.prov) {
        prov = req.params.prov
    }
    let results = fs.readFileSync(`public/${prov}/data/${prov}_results_full.json`)
    res.send(JSON.parse(results))
})
app.get('/:prov/declaration', (req,res)=>{
    let prov = 'nb';
    if (req.params.prov) {
        prov = req.params.prov
    }
    let results = fs.readFileSync(`public/${prov}/data/${prov}_declaration.json`)
    res.send(JSON.parse(results))
})

app.get('/:prov/geojson', (req,res)=> {
    let prov = 'nb'; 
    if (req.params.prov) {
        prov = req.params.prov
    }
    let geo = fs.readFileSync(`public/${prov}/data/${prov}_geo.json`)
    res.send(JSON.parse(geo))
})

app.get('/:prov/config', (req,res)=>{
    let prov = 'nb'; 
    if (req.params.prov) {
        prov = req.params.prov
    }
    let file = fs.readFileSync(`public/${prov}/data/${prov}_config.json`)
    res.send(JSON.parse(file))
})


app.get('/testEnv', (req,res)=> {
    res.send(process.env.TEST_TEXT || "Test text not found")
});

app.get('/:prov/testData', (req,res)=>{
    console.log(req.params)
    let file = fs.readFileSync('public/data/test.json')

    if (req.params.prov) {
        console.log(req.params.prov)
        let prov = req.params.prov
        file = fs.readFileSync(`public/${prov}/data/${prov}_test.json`)
    }
    

    res.send(JSON.parse(file))
})

app.get('*/image/:filename', (req,res)=>{
    let filename = req.params.filename.slice(0,-4)
    let image =  `/headshots/${filename}.jpg`

    if (filename === `D'AMOURS_JC_LIB_48`) {
        console.log('true')
        image =  `/headshots/DAMOURS_Jc_LIB_48.jpg`
    }

    res.redirect(image)
})

function startTimer(req,res,next) {
    console.log(`Server test listening at port ${PORT}.`);
    let update_elections = process.env.UPDATE_ELECTIONS.split(',')
    // getPartyData();

    console.log(update_elections)

    update_elections.map(election=>{
        console.log(election.toLowerCase().trim())

        getPartyData(election.toLowerCase().trim());
        setInterval(()=>{
            console.log("getting party data")
            getPartyData(election.toLowerCase().trim());
        }, process.env.TIMER || 600000)

    })
}


//get party data
function getPartyData(prov) {

    console.log('get party data', prov)

    // var resultsurl = process.env.RESULTSURL || `https://election-touchscreen.globalnews.ca/data/nb_full_2020.json`
    // var overallurl = process.env.OVERALLURL || `https://election-touchscreen.globalnews.ca/data/nb_overall.json`
    // var declarationurl = process.env.DECLARATIONURL || `https://election-touchscreen.globalnews.ca/data/nb_declaration.json`
    // // fetch(overallurl)
    // //     .then(res=> {
    //         if (res.ok) {
    //             return res.json()
    //         } 
    //     })
    //     .then(json=>{

    //         var data = JSON.stringify(json)

    //         fs.writeFile('public/data/nb_overall.json', data, finished)
    //         function finished(err) {
    //             console.log('all done')
    //         }
    //     })
    // fetch(resultsurl)
    //     .then(res=> {
    //         if (res.ok) {
    //             return res.json()
    //         } 
    //     })
    //     .then(json=>{

    //         var data = JSON.stringify(json)

    //         fs.writeFile('public/data/nb_results_full.json', data, finished)
    //         function finished(err) {
    //             console.log('all done')
    //         }
    //     })

    //     fetch(declarationurl)
    //     .then(res=> {
    //         if (res.ok) {
    //             return res.json()
    //         } 
    //     })
    //     .then(json=>{

    //         var data = JSON.stringify(json)

    //         fs.writeFile('public/data/nb_declaration.json', data, finished)
    //         function finished(err) {
    //             console.log('all done')
    //         }
    //     })

}


app.listen(PORT, startTimer)

// app.listen(PORT, ()=> {
//     console.log(`Server test listening at port ${PORT}.`);
// })
