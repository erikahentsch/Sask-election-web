const express = require('express')
const path = require('path')

const PORT = process.env.HTTP_PORT || 4001;
const app = express();

//serve static files//
app.use(express.static('public'));

//server map-app//
app.use(express.static(path.join(__dirname, 'map-widget', 'build')))

app.use('/app2/', express.static(path.join(__dirname, 'graph-widget', 'build')));
app.get('/app2/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './graph-widget/build','index.html'));
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


app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}.`)
})