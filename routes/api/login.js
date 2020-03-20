const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = require('../../db/users.json').users;
const secret = require('../../config/auth').secret;

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  let [user] = users.filter(user => (user.username === username && user.password === password));

  if(!user) {
    res.status(401).json({status: 'User not found'});
  }

  let token = jwt.sign(user, secret);
  res.json({jwt_token: token});
});

module.exports = router;