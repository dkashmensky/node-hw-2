const express = require('express');
const utils = require('./utils');

const router = express.Router();
const userFilePath = './db/users.json';

router.delete('/delete-user', (req, res) => {
  const userId = req.body.user_id;
  const { user } = req;

  if (userId === user.id) {
    const userFile = utils.getFile(userFilePath);

    const userIndex = userFile.users.findIndex(item => item.id === userId);
    if (userIndex !== -1) {
      userFile.users.splice(userIndex, 1);
      utils.putFile(userFile, userFilePath);
      res.status(200).json({
        status: `User ID: ${userId} deleted successfully`,
      });
    } else {
      res.status(400).json({
        status: `User ID: ${userId} not found`,
      });
    }
  } else {
    res.status(403).json({
      status: 'No permission to complete operation',
    });
  }
});

module.exports = router;
