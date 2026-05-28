		const express = require('express');

		const app = express();

		app.use(express.urlencoded({extended: true}));
		app.set('views', `${__dirname}/views`);
		app.set('view engine', 'pug');
		app.use(express.static('public'));

		const tasks = [
			{name: "Default", completed: false},
		];


		app.get('/sum', (req, res) => {
			const error = req.query.error;
			const result = req.query.result;
			res.render('todo-improved', {tasks, error, result});
		});

		app.post('/add-task', (req, res) => {
			const numA = req.body.numA;
			const numB = req.body.numB
			if ((numA !== undefined && numA.trim() !== '') && (numB !== undefined && numB.trim() !== '')) {
				const sumResult = Number(numA) + Number(numB);
				tasks.push({name: sumResult, completed: false});
				
				res.redirect(`/sum?result=${sumResult}`);	
			}
			else {
				res.redirect('/sum?error=두 숫자를 모두 입력해주세요!');
			}
		});



		app.post('/complete-task', (req, res, next) => {
			const taskIndex = Number(req.body.taskIndex);
			if (taskIndex >= tasks.length) {
				next('존재하지 않는 일입니다.');
			} else {
				tasks[taskIndex].completed = true;
				res.redirect('/sum');
			}	
		});


		app.use((error, req, res, next) => {
			res.redirect(`/sum?error=${error}`);
		});

		app.use((req, res, next) => {
			res.redirect('/sum');
		});

		app.listen(8080, () => {
			console.log("server listening on port 8080!")
		});