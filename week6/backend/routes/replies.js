const express = require('express');
const router = express.Router();
const replyService = require('../services/replyService');

router.delete('/:replyId', async (req, res) => {
  try {
    const { replyId } = req.params;

    // 1. 세션에서 userId 가져오기
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).json({ error: '로그인이 필요합니다.' });
    }

    // 2. replyService.deleteReply() 호출
    await replyService.deleteReply(replyId, userId);

    // 3. 200 상태코드 반환 (501 코드 제거)
    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
