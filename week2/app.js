const express = require("express");
const path = require("path");
const app = express();

// 라우터 모듈 불러오기
const foodRouter = require('./food');
const mathRouter = require('./math');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/user/:id", (req, res, next) => {
    const id = req.params.id;
    if (id !== "1") {
        res.send('You are not welcomed!');
    } else {
        next();
    }
});

app.get("/user/:id", (req, res, next) => {
    const id = req.params.id;
    res.send(`<h1>Your id is ${id}</h1>`);
    next();
});

app.get("/user/:id", (req, res) => {
    console.log('Someone searched user 1!');
})

app.use('/food', foodRouter);
app.use('/math', mathRouter)

app.listen(8080, () => {
    console.log('Server listening on port 8080!');
});