const express = require('express');
const utils = require('./utils');
const router = express.Router();

const userFilePath = './db/users.json';

router.delete('/delete-user', (req, res) => {
  const { user_id } = req.body;
  const user = req.user;

  if(user_id === user.id) {
    const userFile = utils.getFile(userFilePath);

    const userIndex = userFile.users.findIndex(user => user.id === user_id);
    if(userIndex != -1) {
      userFile.users.splice(userIndex, 1);
      utils.putFile(userFile, userFilePath);
      res.status(400).json({status: `User ID: ${user_id} deleted successfully`});
    } else {
      res.status(400).json({status: `User ID: ${user_id} not found`});
    }
  } else {
    res.status(403).json({status: 'No permission to complete operation'});
  }
});

module.exports = router;