const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  completed: Boolean,
  text: String,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
