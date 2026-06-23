const express = require('express');
const session = require('express-session');

const app = express();

let sessionID = 1;
app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/login', (req, res) => {
	const { user } = req.session;
	if(user) return res.send(`you are already logged in!`);
	const name = req.query.name;
	const Id = sessionID++;
	req.session.user ={
		Id,
		name
	}
	return res.send(`hi ${name} your session id is ${Id}`)
});

app.get('/logout', (req, res) => {
	req.session.destory (err=>{
		if(err) return req.send('something wrong');
		res.send('success');
	})
});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
	const { user } = req.session;

	if(!user) return res.send(`you are not logged in!`);
	user.msg = msg;
	return res.send(`i rememeber you!`)
});

app.get('/ask', (req, res) => {
	const { user } = req.session;
	if(!user) return res.send(`you are not logged in!`);
	const {Id, name, msg} = user;
	return res.send(`hi ${name} your session id is ${Id} msg: ${user.msg}`);
});

app.listen(8080, async ()=>{
	console.log('server started!')
});