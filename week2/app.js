const express = require("express");
const app = express();

console.log("week02 app.js")
app.set('view engine', 'pug');
app.set('views', './views');


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
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    res.render("result", {
        a,
        b,
        sum: a+b
    });
});


app.get("/math", (req, res) => {
    res.render("input");
})

app.listen(8000, "0.0.0.0", () => {
    console.log('Sever running');
});