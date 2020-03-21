const express = require('express');
const router = express.Router();
const utils = require('./utils');

const userFilePath = './db/users.json';

router.post('/register', (req, res) => {
  const { fullname, username, password } = req.body;

  if(fullname && username && password) {
    const userFile = utils.getFile(userFilePath);

    if(!userFile.users.find(user => user.username === username)) {
      const newUser = {
        id: utils.getNextId(userFile.users),
        fullname: fullname,
        username: username,
        password: password,
      }

      userFile.users.push(newUser);
      utils.putFile(userFile, userFilePath);

      res.status(200).json({status: 'User created successfully.'});
    } else {
      res.status(400).json({status: 'Username already exists'});
    }
  } else {
    res.status(400).json({status: 'Mandatory fields are empty'});
  }
});

module.exports = router;