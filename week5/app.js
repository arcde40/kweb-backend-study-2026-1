const express = require('express');
const session = require('express-session');

const app = express();

let sessionId = 1;

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/login', (req, res) => {
	const {user} = req.session;
	if(user) return res.send(`You are already loogged in!`);
	const name = req.query.name;
	const id = sessionId++;
	req.session.user = {
		id: sessionId++,
		name: name,
	};
	return res.send(`Hi, ${name}. Your session id = ${id}`)
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) return req.send(`Something went wrong...`);
		return res.send(`Success!`);
	});
});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
	const user = req.session;

	if(!user) return res.send(`You are not loggeed in!`);
	user.msg = msg;
	return res.send(`I remember you!`);
});

app.get('/ask', (req, res) => {
	const {user} = req.session;
	if(!user) return res.send(`You are not loggeed in!`);
	const {id, name, msg} = user;

	return res.send(`Your id = ${id}, name = ${name}, msg = ${msg}`)
});

app.listen(8080, async ()=>{
	console.log('server started!')
});