const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { result: null, expression: null });
});

router.post('/sum', (req, res) => {
  const a = Number(req.body.a);
  const b = Number(req.body.b);

  res.render('index', {
    result: a + b,
    expression: `${a} + ${b}`
  });
});

router.post('/sub', (req, res) => {
  const a = Number(req.body.a);
  const b = Number(req.body.b);

  res.render('index', {
    result: a - b,
    expression: `${a} - ${b}`
  });
});

module.exports = router;