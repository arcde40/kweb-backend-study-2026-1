const express = require('express');
const app = express();

const mathRouter = require('./math');

app.use('/math', mathRouter);

app.listen(8888, () => {
  console.log('Server running on port 8888');
});