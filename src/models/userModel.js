const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {
  User,
};
