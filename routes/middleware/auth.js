const jwt = require('jsonwebtoken');
const secret = require('../../config/auth').secret;
const utils = require('../api/utils');

const userFilePath = './db/users.json';

module.exports = (req, res, next) => {
  if(req.headers['authorization']) {
    const [token_type, jwt_token] = req.headers['authorization'].split(' ');

    let user = jwt.verify(jwt_token, secret);
    req.user = user;

    const users = utils.getFile(userFilePath).users;
    if(!users.find(item => item.id === user.id)) {
      res.status(400).json({status: 'User does not exist'});
      return;
    }

    next();
  }
}