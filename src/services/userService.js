const { User } = require('../models/userModel');

const getUserProfileInfo = async userId => {
  const user = await User.findOne({ _id: userId });
  return user;
};

module.exports = {
  getUserProfileInfo,
};
