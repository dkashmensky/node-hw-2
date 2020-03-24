/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-unresolved
const { secret } = require('../../config/auth');
const utils = require('../api/utils');

const userFilePath = './db/users.json';

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const jwtToken = req.headers['authorization'].split(' ')[1];

    const user = jwt.verify(jwtToken, secret);
    req.user = user;

    const { users } = utils.getFile(userFilePath);
    if (!users.find(item => item.id === user.id)) {
      res.status(400).json({
        status: 'User does not exist',
      });
      return;
    }

    next();
  } else {
    res.status(400).json({
      status: 'No authorization headers,',
    });
  }
};
