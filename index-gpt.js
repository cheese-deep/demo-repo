const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Endpoint 1: GET /files - Returns a list of files in ./files/ directory
app.get('/files', (req, res) => {
  const dirPath = path.join(__dirname, 'files'); // Path to the files directory

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read the directory' });
    }
    res.status(200).json(files); // Respond with array of file names
  });
});

// Endpoint 2: GET /file/:filename - Returns the content of the specified file
app.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'files', filename); // Path to the file
  console.log(filePath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('File not found'); // File not found
      }
      return res.status(500).send('Error reading file'); // General error
    }
    res.status(200).send(data); // Send the file content
  });
});

// For any other routes not defined, return 404
// app.use((req, res) => {
//   res.status(404).send('Route not found');
// });



app.listen(3000);
module.exports = app;
