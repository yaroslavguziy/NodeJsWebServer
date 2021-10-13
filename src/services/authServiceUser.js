const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Error} = require('mongoose');

const {User} = require('../models/userModel');

const registration = async ({username, password}) => {
  const user = User({
    username,
    password: await bcrypt.hash(password, 10),
  });
  await user.save();
};

const signIn = async ({username, password}) => {
  const user = await User.findOne({username});

  if (!user) {
    throw new Error('Invalid username or password');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({
    _id: user._id,
    username: user.username,
  }, 'secret');
  return token;
};

module.exports = {
  registration,
  signIn,
};
