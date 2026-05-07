const express = require("express");

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get("/user/:id", (req, res, next) => {
    const id = req.params.id;
    if(id !== "1") res.send('You are not welcomed!');
    else next();
});

app.get("/user/:id", (req, res, next) => {
    const id = req.params.id;
    res.send(`<h1>Your id is ${id}</h1>`);
    next();
});

app.get("/user/:id", (req, res) => {
    console.log('Someone searched user 1!');
})

const foodRouter = require('./food');
app.use('/food', foodRouter);

const mathRouter = require('./math');
app.use('/math', mathRouter);

app.get("/calculator", (req, res) => {
    // 폼에서 전송된 a, b 값을 가져옵니다. (처음 접속 시에는 undefined)
    const a = req.query.a;
    const b = req.query.b;
    let sum = null;
    let diff = null;

    // a와 b가 모두 입력된 경우에만 계산 실행
    if (a !== undefined && b !== undefined) {
        sum = Number(a) + Number(b);
        diff = Number(a) - Number(b);
    }

    // views/calculator.pug 파일을 렌더링하면서 변수들을 넘겨줍니다.
    res.render('calculator.pug', { a, b, sum, diff });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080!');
});