const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
    res.send("<h1>Hello, World!</h1>");
});

app.get("/bye", (req, res) => {
    res.send("<h1>Goodbye, World!</h1>");
});

app.listen(8080, () => {
    console.log('Server listening on port 8080!');
});