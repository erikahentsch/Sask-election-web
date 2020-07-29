const express = require('express')
const path = require('path')

const PORT = process.env.HTTP_PORT || 4001;
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/app1/', express.static(path.join(__dirname, 'client2', 'build')))
app.get('/app1', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client2/build', 'index.html'));
});

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

app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}.`)
})