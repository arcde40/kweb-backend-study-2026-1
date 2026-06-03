const express = require('express');
const session = require('express-session');

let sessionId = 1;

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/login', (req, res) => {
	const name = req.query.name;

	req.session.user = {
		id: sessionId++,
		name: name
	}
	
	return res.send(`Hi, ${name}! Your id is: ${id}`);
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return res.send('Something went wrong...');
		return res.send('Success!');
	});
});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
	const {user} = req.session;
	if(!user) return res.send('You are not logged in!');
	user.msg = msg;
	return res.send("I remember you!");
});

app.get('/ask', (req, res) => {
	const {user} = req.session;
	if(!user) return res.send('You are not logged in!');
	const {id, name, msg} = user;
	return res.send(`id: ${id}, name: ${name}, your message: ${msg}`);
});

app.listen(8080, async ()=>{
	console.log('server started!')
});