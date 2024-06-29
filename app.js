const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');

const cors = require('cors');




const app = express()
const port = 3000


app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all origins


var IsActive = true


app.get('/status', (req, res) => {
  res.json({ IsActive });
});


app.get('/download', (req, res) => {
  const filename = "something.py";
  // const filePath = path.join(filesDirectory, filename);
  res.download(filename, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.post('/toggle', (req, res) => {
  const { state } = req.body;
  if (state === 'on') {
      IsActive = true;
  } else if (state === 'off') {
      IsActive = false;
  } else {
      return res.status(400).json({ success: false, message: 'Invalid state' });
  }
  res.json({ success: true });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
