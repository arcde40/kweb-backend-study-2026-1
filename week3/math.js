const express = require("express");

const router = express.Router();

const ans = {sum: 0, sub: 0, cal: false};

router.post("/calculate", (req, res, next) => {
    const a = req.body.a;
    const b = req.body.b;
    ans.cal = true;
    ans.sum = Number(a) + Number(b);
    ans.sub = Number(a) - Number(b);
    res.redirect('/calculator');
});

module.exports = {router, ans};