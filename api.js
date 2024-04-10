const express = require('express');
const path = require('path');
const fsp = require('fs').promises;
const cors = require('cors');
const {logEvent} = require('./middleware/logEvents')

PORT = 8100;
app = express();

app.use(cors())

app.use((req,res,next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}\t${req.path}`)
    next()
})

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.post('/upload_image', (req,res)=>{
    console.log(req.files)
    let data = JSON.parse(req.json);
    let file = data['file']
    let filename = data['filename']
    fsp.writeFile(path.join(__dirname, filename, '.png'), Buffer.from(file))
    res.status(200).send(`OK`);
})

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});