const mongoose = require('mongoose');

const Note = mongoose.model('Notes', {
  userId: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {
  Note,
};
