const express = require("express");

const router = express.Router();

router.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} + ${b} = ${Number(a) + Number(b)}`);
});

router.get('/sub', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} - ${b} = ${Number(a) - Number(b)}`);
});

module.exports = router;