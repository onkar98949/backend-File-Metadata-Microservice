const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');

app.set('view engine','ejs' );

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage});

app.get('/', (req,res)=>{
    res.render('home');
})


app.post('/upload', upload.single('upfile'), (req,res) => {
    if(!req.file){
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const { originalname, mimetype, size } = req.file;
    res.json({ name: originalname, type: mimetype, size: size });
});


app.listen(port, ()=>{
    console.log(`server is runnung on port ${port}`);
})

