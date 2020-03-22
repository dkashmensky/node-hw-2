const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const utils = require('./utils');

const secret = require('../../config/auth').secret;

router.post('/login', (req, res) => {
  const users = utils.getFile('./db/users.json').users;

  const { username, password } = req.body;

  const [user] = users.filter(user => (user.username === username && user.password === password));

  if(!user) {
    res.status(401).json({status: 'User not found'});
    return;
  }

  const token = jwt.sign(user, secret);
  res.json({jwt_token: token});
  res.header()
});

module.exports = router;