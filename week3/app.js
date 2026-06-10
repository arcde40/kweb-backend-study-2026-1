const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

const tasks = [
	{name: "Default", completed: false},
];

/* Your Code Here */
app.get('/todo', (req, res) => {
	const error = req.query.error;
	res.render('todo-improved.pug', {tasks, error});
});

app.post('/add-task', (req, res, next) => {
	const taskName = req.body.taskName;
	if(taskName && taskName.trim() !== '') {
		tasks.push({name: taskName, completed: false});
		next();
	} else {
		next('할 일이 비었습니다!');
	}
});

app.post('/complete-task', (req, res, next) => {
	const taskIndex = Number(req.body.taskIndex);
	if(taskIndex < 0 || taskIndex >= tasks.length) {
		next('존재하지 않는 일입니다.');
	} else {
		tasks[taskIndex].completed = true;
		next();
	}
});

app.use((req, res, next) => {
	res.redirect('/todo');
});

app.use((error, req, res, next) => {
	res.redirect(`/todo?error=${error}`);
});

app.listen(8080, () => {
	console.log("네");
})