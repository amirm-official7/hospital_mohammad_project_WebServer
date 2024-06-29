const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs').promises;


const cors = require('cors');




const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all origins


var IsActive = true
const statusFilePath = path.join(__dirname, 'status.json');


const readStatusFromFile = async () => {
  try {
      const data = await fs.readFile(statusFilePath);
      return JSON.parse(data);
  } catch (error) {
      console.error('Error reading status file:', error);
      return { IsActive: false }; // Default value if file read fails
  }
};

// Helper function to write the status to the JSON file
const writeStatusToFile = async (IsActive) => {
  try {
      const data = JSON.stringify({ IsActive });
      await fs.writeFile(statusFilePath, data);
  } catch (error) {
      console.error('Error writing status file:', error);
  }
};



app.get('/status',async (req, res) => {
  try {
    const { IsActive } = await readStatusFromFile();
    res.json({ IsActive });
} catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch status', IsActive: false });
}

});


app.get('/download', (req, res) => {
  const filename = "clientfiles.zip";
  // const filePath = path.join(filesDirectory, filename);
  res.download(filename, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.post('/toggle',async (req, res) => {
  const { state } = req.body;
  if (state !== 'on' && state !== 'off') {
      return res.status(400).json({ success: false, message: 'Invalid state' });
  }

  try {
      await writeStatusToFile(state === 'on');
      res.json({ success: true });
  } catch (error) {
      console.error('Error toggling state:', error);
      res.status(500).json({ success: false, message: 'Failed to toggle state' });
  }
});

app.get('/statuscontrol', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});





app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
