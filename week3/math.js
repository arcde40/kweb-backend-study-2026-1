const express = require('express');
const math = express();

math.use(express.urlencoded({extended: true}));
math.set('views', `${__dirname}/views`);
math.set('view engine', 'pug');
math.use(express.static('public'));

math.get('/math', (req, res) => {
    const error = req.query.error;
    const result = req.query.result;
    const a = req.query.a;
    const b = req.query.b;
    const operator = req.query.operator;
    
    res.render('math.pug', { result, error, a, b, operator });
});

math.post('/math/calc', (req, res, next) => {
    const a = req.body.a;
    const b = req.body.b;
    const operator = req.body.operator;
    let result = 0;

    if (!a || !b || a.trim() === '' || b.trim() === '') {
        return next('숫자 A와 B를 모두 입력해주세요!');
    }

    if (operator === 'sum') {
        result = Number(a) + Number(b);
    } else if (operator === 'sub') {
        result = Number(a) - Number(b);
    }

    res.redirect(`/math?a=${a}&b=${b}&operator=${operator}&result=${result}`);
});

math.use((req, res, next) => {
    res.redirect('/math');
});

math.use((error, req, res, next) => {
    res.redirect(`/math?error=${encodeURIComponent(error)}`);
});

math.listen(8080, () => {
    console.log('Server listening on port 8080!');
});