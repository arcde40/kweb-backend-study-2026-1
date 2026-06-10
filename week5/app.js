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
	if(user) return res.send('you are already logge in!')
		
	const name = req.query.name;
	const id = sessionId++;

	req.session.user = {
		id: sessionId++,
		name: name,
	};

	return res.send(`Hi, ${name}. Yur session id = ${id}`)
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return req.send('something went wrong...');
		return res.send('success!');
	})
});

app.get('/tell', (req, res) => {
	const msg = req.query.msg;
	const { user } = req.session;

	if (!user) return res.send('You are not logged in!');
	user.msg = msg;
	return res.send('I remember you!');
});

app.get('/ask', (req, res) => {
    // req와 res 둘 다 체크해서 존재하는 쪽에 send를 호출하도록 안전장치를 둡니다.
    const sendResponse = (msg) => {
        if (res && typeof res.send === 'function') return res.send(msg);
        if (req && typeof req.send === 'function') return req.send(msg);
    };

    // 기존의 req.session은 첫 번째 인자에 들어있으므로 그대로 씁니다.
    const { user } = req.session || {}; 
    
    if (!user) return sendResponse('You are not logged in!');
    const { id, name, msg } = user;

    return sendResponse(`Your id = ${id}, name = ${name}, msg = ${msg}`);
});

app.listen(8080, async ()=>{
	console.log('server started!')
});