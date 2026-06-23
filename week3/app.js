const express = require('express');
const app = express();

const mathRouter = require('./math');

app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/math', mathRouter);

app.get('/', (req, res) => {
  res.redirect('/math');
});

app.listen(8888, () => {
  console.log('Server running on port 8888');
});