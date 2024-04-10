const express = require('express');
const path = require('path');
const fsp = require('fs').promises;
const cors = require('cors');
const multer = require('multer')
const {logEvent} = require('./middleware/logEvents')

const upload = multer({'dest': __dirname})

PORT = 8100;
app = express();

app.use(cors())

app.use((req,res,next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}\t${req.path}`)
    next()
})

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.post('/upload_image', upload.single('file'), (req,res)=>{
    let file = req.file
    let filename = req.filename
    res.status(200).send(`OK`);
})

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});