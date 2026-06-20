const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/login', (req, res) => {
	const name = req.query.name;
});

app.get('/logout', (req, res) => {

});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
});

app.get('/ask', (req, res) => {

});

app.listen(8080, async ()=>{
	console.log('server started!')
});