const express = require('express');
const router = express.Router();

const { registration, signIn } = require('../services/authServiceUser');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    await registration({ username, password });
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: 'Bad request' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    const jwtToken = await signIn({ username, password });
    res.status(200).json({ message: 'Success', jwt_token: jwtToken });
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = {
  authRouter: router,
};
