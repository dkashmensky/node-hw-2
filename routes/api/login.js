const express = require('express');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const router = express.Router();

// eslint-disable-next-line import/no-unresolved
const { secret } = require('../../config/auth');

router.post('/login', (req, res) => {
  const { users } = utils.getFile('./db/users.json');

  const { username, password } = req.body;

  const [user] = users.filter(
    item => item.username === username && item.password === password
  );

  if (!user) {
    res.status(401).json({
      status: 'User not found',
    });
    return;
  }

  const token = jwt.sign(user, secret);
  res.json({
    jwt_token: token,
  });
  res.header();
});

module.exports = router;
