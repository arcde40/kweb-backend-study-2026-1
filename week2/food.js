const express = require("express");
const router = express.Router();

router.get('/burger', (req, res) => {
    res.send(`I'm hungry! - Burger`);
});

router.get('/chicken', (req, res) => {
    res.send(`I'm hungry! - Chicken`);
});

router.get('/pizza', (req, res) => {
    res.send(`I'm hungry! - Pizza`);
});

router.get('/rice', (req, res) => {
    res.send(`I'm hungry! - Rice`);
});

router.use((req, res) => {
    res.status(404).send("<h1>That food is not available!!!</h1>");
});

module.exports = router;