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
	if(user) return res.send("booooo");

	const name = req.query.name;
	const id = sessionId++;

	req.session.user = {
		id: id,
		name: name,
	};

	return res.send(`Hi, ${name}, your sessionId is ${id}`);
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return res.send("booboo");
		return res.send("choochoo");
	});
});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
	const { user } = req.session;

	if(!user) return res.send("U R not logged in");
	user.msg = msg;
	return res.send("I remember U");
});

app.get('/ask', (req, res) => {
	const {user} = req.session;
	if(!user) return res.send("U R not logged in");
	const {id, name, msg} = user;

	return res.send(`${id} ${name} ${msg}`);
});

app.listen(8080, async ()=>{
	console.log('server started!')
});