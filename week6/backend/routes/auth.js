const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // TODO: authService.register() 호출 후 결과 반환

    res.status(501).json({ error: 'Not implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // TODO:
    // 1. authService.login() 호출
    // 2. 세션에 userId 저장: req.session.userId = user.id
    // 3. 사용자 정보 반환

    res.status(501).json({ error: 'Not implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    // TODO: req.session.destroy() 호출

    res.status(501).json({ error: 'Not implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    // TODO:
    // 1. 세션 확인 (req.session.userId)
    // 2. authService.getCurrentUser() 호출
    // 3. 사용자 정보 반환

    res.status(501).json({ error: 'Not implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
