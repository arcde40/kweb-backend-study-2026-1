const express = require("express");

const app = express();

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

app.get("/math/sum", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} + ${b} 는 ${Number(a)+Number(b)} 입니다!`);
});

app.get("/math/sub", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} - ${b} 는 ${Number(a)-Number(b)} 입니다!`);
});


app.listen(8080, () => {
    console.log('Server listening on port 8080!');
});