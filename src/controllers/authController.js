const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = process.env.SECRET_KEY;

const registration = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.findOne({ username });

    if (newUser) {
      return res.status(400).json({ message: 'User with same name has already exist' });
    }

    const user = new User({
      username: username,
      password: await bcrypt.hash(password, 7),
    });

    await user.save();
    return res.status(200).json({ message: 'Success' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: `User with ${username} not found` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      secret
    );

    return res.status(200).json({ message: 'Success', jwt_token: token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  registration,
  signIn,
};
