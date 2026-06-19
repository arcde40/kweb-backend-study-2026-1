const express = require("express");

const router = express.Router();

router.get('/sum', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(`${a}+${b}는 ${a+b}입니다!`);
});

router.get('/sub', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(`${a}-${a}는 ${a-b}입니다!`);
});

router.use((req, res, next) => {
    res.status(404).send("sum/a=?&b=?, sub/a=?&b=?을 이용하여 계산하세요.</h1>");
})

module.exports = router;