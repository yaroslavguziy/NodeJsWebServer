const express = require('express');
const router = express.Router();

const { getUserProfileInfo } = require('../services/userService');

router.get('/me', async (req, res) => {
  const { userId } = req.user;

  try {
    const userInfo = await getUserProfileInfo(userId);

    if (!userInfo) {
      res.status(400).json({ message: 'Bad request' });
    }

    const user = { _id: userInfo._id, username: userInfo.username, createdDate: userInfo.createdDate };
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  userRouter: router,
};
