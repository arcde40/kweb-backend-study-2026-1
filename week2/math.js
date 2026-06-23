const express = require('express');
const router = express.Router();

router.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  res.send(`<h1>${a} + ${b} = ${a + b}</h1>`);
});

router.get('/sub', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  res.send(`<h1>${a} - ${b} = ${a - b}</h1>`);
});

module.exports = router;