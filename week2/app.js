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

const mathRouter = require('./math');
app.use('/math', mathRouter);

app.listen(8080, () => {
    console.log('Server listening on port 8080!');
});