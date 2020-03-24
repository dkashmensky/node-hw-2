const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
  res.json({
    id: req.user.id,
    fullname: req.user.fullname,
    username: req.user.username,
  });
});

module.exports = router;
