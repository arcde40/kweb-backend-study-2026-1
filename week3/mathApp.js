const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.listen(8090, () => {
    console.log('Server running on port 8090');
});

const mathRouter = require('./math');
app.use('/math', mathRouter.router);

app.get('/calculator', (req, res) => {
	const error = req.query.error;
	res.render('view.pug', {ans: mathRouter.ans, error});
});