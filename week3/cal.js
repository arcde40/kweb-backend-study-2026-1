const express = require('express');

const cal = express();

cal.use(express.urlencoded({extended: true}));
cal.set('views', `${__dirname}/views`);
cal.set('view engine', 'pug');
cal.use(express.static('public'));

let sign = 1;
let result = 0;

cal.get('/main', (req, res) => {
	res.render('cal.pug', { sign, result, error: req.query.error });
});

cal.post('/signal', (req, res, next) => {
	sign = req.body.signal;
	next();
});

cal.post('/plus', (req, res, next) => {
	const a = Number(req.body.a);
	const b = Number(req.body.b);
	if(a && b) {
		result = a+b;
		next();
	} else {
		next("숫자를 입력하세요!");
	}
});

cal.post('/minus', (req, res, next) => {
	const a = Number(req.body.a);
	const b = Number(req.body.b);
	if(a && b) {
		result = a-b;
		next();
	} else {
		next("숫자를 입력하세요!");
	}
});


cal.use((req, res, next) => {
	res.redirect('/main');
}) 

cal.use((error, req, res, next) => {
	res.redirect(`/main?error=${error}`);
});
// 맨 위에 설명 '기호를 눌러서 덧셈, 뺄셈을 변경하세요!'
// 박스를 누르면 +-가 변경됨. 
// 기호 양쪽에 박스 2개 2개 누르면 계산한 값을 크게 보여준다. 
// (칸1&칸3(값을 받으면 sign에 따라 /plus /minus 요청)) (칸2(sign에 따라 +. - 변경)) (칸4 result를 출력)

cal.listen(8080, () => {
    console.log('Server listening on port 8080!');
});