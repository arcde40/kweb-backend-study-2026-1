const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

const tasks = [
	{name: "Default", completed: false},
];

app.get('/todo', (req, res) => {
	res.render('todo-improved.pug', { tasks, error: req.query.error });
});

app.post('/add-task', (req, res, next) => {
	const name = req.body.taskName;
	if(name && name.trim() !== '') {
		tasks.push({name, completed: false});
		next();
	} else {
		next("할 일이 비어있습니다!");
	}
});

app.post('/complete-task', (req, res, next) => {
	const index = Number(req.body.taskIndex);
	if(index < 0 || index >= tasks.length) {
		next("없는 일 번호입니다!");
		return;
	}
	tasks[index].completed = true;
	next();
});

app.use((req, res, next) => {
	res.redirect('/todo');
}) 

app.use((error, req, res, next) => {
	res.redirect(`/todo?error=${error}`);
});

app.listen(8080, ()=>{});