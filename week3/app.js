const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/calculator');
});

app.get('/calculator', (req, res) => {
  res.render('calculator', {
	result: null,
	error: null
  });
});

app.post('/calculate', (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
	return res.render('calculator', {
	  result: null,
	  error: '두 수를 모두 입력해주세요.'
	});
  }

  const sum = num1 + num2;
  const diff = num1 - num2;

  res.render('calculator', {
	result: {
	  num1,
	  num2,
	  sum,
	  diff
	},
	error: null
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});