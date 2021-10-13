const { Note } = require('../models/noteModel');

const getAllNotes = async userId => {
  const notes = await Note.find({ userId: userId });

  return notes;
};

const addNote = async (userId, content) => {
  const note = Note({
    userId: userId,
    completed: false,
    text: content,
  });

  try {
    await note.save();
  } catch (err) {
    console.log(err);
  }
};

const getNote = async (taskId, userId) => {
  const note = await Note.findOne({ _id: taskId, userId });
  return note;
};

const checkNoteById = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId });

  note.completed
    ? await Note.findOneAndUpdate({ _id: noteId, userId }, { completed: false })
    : await Note.findOneAndUpdate({ _id: noteId, userId }, { completed: true });
};

const deleteNoteById = async (noteId, userId) => {
  await Note.findOneAndRemove({ _id: noteId, userId });
};

module.exports = {
  getAllNotes,
  addNote,
  getNote,
  checkNoteById,
  deleteNoteById,
};
