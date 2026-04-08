const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

app.get('/bye', (req, res) => {
  res.send('Goodbye, World!');
});

app.listen(8888, () => {
  console.log('Server running on port 8888');
});