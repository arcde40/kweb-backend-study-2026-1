const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));  //POST form을 req.body로 읽을 수 있음
app.set('views', `${__dirname}/views`);	        //${__dirname} 현재 파일의 디렉토리명
app.set('view engine', 'pug');                  //엔진으로 pug 사용
app.use(express.static('public'));


app.get('/math', (req, res) => {
    res.render('math.pug', {undefined});
});

app.post('/calculate', (req, res) =>{
    const { num1, num2, operator } = req.body;
    if(operator === '+'){
        const result = `${num1} + ${num2} = ${Number(num1)+Number(num2)}`;
        res.render('math.pug', {result});
    }
    else{
        const result = `${num1} - ${num2} = ${Number(num1)-Number(num2)}`
        res.render('math.pug', {result});
    }
    
});

app.use((req, res, next) => {
	res.redirect('/math');
});

app.listen(8888, () => {});