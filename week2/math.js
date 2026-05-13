const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('math');
});

router.post('/calculate', (req, res) => {
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    const op = req.body.op;

    let result;

    if (op === 'sum') {
        result = `${a} + ${b} = ${a + b}`;
    } else if (op === 'sub') {
        result = `${a} - ${b} = ${a - b}`;
    }

    res.render('math', { result });
});

module.exports = router;