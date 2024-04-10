const express = require('express');
const path = require('path');
const fsp = require('fs').promises;
const cors = require('cors');
const multer = require('multer')
const {logEvent} = require('./middleware/logEvents')

const upload_folder = '/home/andy/AI/ComfyUI/input'
const upload = multer({'dest': upload_folder})

PORT = 8100;


app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use((req,res,next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}\t${req.path}`)
    next()
})

app.post('/upload_image', upload.single('file'), (req,res)=>{
    let file = req.file
    let filename = req.file.originalname

    console.log(filename)
    
    fsp.rename(path.join(upload_folder, req.file.filename), path.join(upload_folder, filename))
    res.status(200).send(`OK`);
})

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});