const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');
var Tesseract = require('tesseract.js');

//middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + '/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});



var upload = multer({
  storage: Storage
}).single('image');


//routes
//home page
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/upload',(req,res) => {
  res.render('index2');
});


//going to upload page
app.post('/upload', (req, res) => {
  console.log(req.file);
  upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.send('Something went wrong');
    }

    var image = fs.readFileSync(
      __dirname + '/images/' + req.file.originalname,
      {
        encoding: null
      }
    );

    //ocr model
    Tesseract.recognize(image)
      .progress(function(p) {
        console.log('progress', p);
      })
      .then(function(result) {
        res.send(result.html);
      });
  });
});

app.get('/showdata', (req, res) => {});


//server created
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
