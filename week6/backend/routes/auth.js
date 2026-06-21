const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const createdUser = await authService.register(username, password);

    //express json.
    res.status(200).json(createdUser);
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
    
    const user = await authService.login(username, password);
    req.session.userId = user.id;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    req.session.destroy()
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const {userId} = req.session;
    const user = await authService.getCurrentUser(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
