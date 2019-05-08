const express = require("express");
const multer = require("multer");
const cors = require("cors")
const upload = multer({ dest: "uploads/" });
const app = express();

app.options('/upload', cors())

app.get('/',cors(), (req, res) => {
  res.send('Nodejs Upload Image Service')
})

app.post("/upload", cors(), upload.single("file"), (req, res) => {
  res.send(req.file.filename);
});


app.get('/upload/:key', cors(), (req, res)=>{
  res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg',
    }
  }, (error) => {
    res.status(404).send('file not found')
  })
})

const port = process.env.PORT || 3000
app.listen(port);
