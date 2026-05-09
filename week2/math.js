const express = require("express");
const router = express.Router();

// GET /math/sum
router.get('/sum', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(`${a} + ${b} = ${a + b}입니다.`);
});

// GET /math/sub
router.get('/sub', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(`${a} - ${b} = ${a - b}입니다.`);
});

module.exports = router;