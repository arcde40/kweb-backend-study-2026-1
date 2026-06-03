const express = require('express');
const session = require('express-session');

const app = express();

let sessionid = 1;

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/login', (req, res) => {
	const {user} = req.session;
	if (user) return res.send('Your are already logged in!');

	const name = req.query.name;
	const id = sessionid++;``

	req.session.user = {
		id: id,
		name: name,
	};

	return res.send(`Hi, ${name}, Your session id = ${id}.`)
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) return req.send('Something went wrong...');
		return res.send('Sucess!');
	})
});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
	const user = req.session;

	if (!user) return res.send('Your are not logged in!');
	user.msg = msg;
	return res.send('I remember you!');
});

app.get('/ask', (req, res) => {
	const {user} = req.session;
	if (!user) return res.send('Your are not logged in!');
	const {id, name, msg} = user;

	return res.send(`Your id = ${id}, name = ${name}, msg = ${msg}`)
});

app.listen(8080, async ()=>{
	console.log('server started!')
});