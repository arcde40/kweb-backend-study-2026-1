const express = require('express');
const router = express.Router();
const replyService = require('../services/replyService');

router.delete('/:replyId', async (req, res) => {
  try {
    const { replyId } = req.params;
    const { userId } = req.session;
    await replyService.deleteReply(replyId, userId);

    res.status(200).return();
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
