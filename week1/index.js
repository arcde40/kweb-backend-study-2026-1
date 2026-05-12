const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello, world!");
});

app.get("/bye", (req, res) => {
    res.send("Goodbye, World!");
});

app.listen(8080,() => {
    console.log("Server is running on 8080!");
})