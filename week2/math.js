const express = require("express");

const router = express.Router();

router.get("/sum", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} + ${b} 는 ${Number(a)+Number(b)} 입니다!`);
});

router.get("/sub", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} - ${b} 는 ${Number(a)-Number(b)} 입니다!`);
});

module.exports = router;