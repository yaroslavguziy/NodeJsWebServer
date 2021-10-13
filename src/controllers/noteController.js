const express = require('express');
const router = express.Router();

const { getAllNotes, addNote, getNote, checkNoteById, deleteNoteById } = require('../services/notesServices');

router.get('/', async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    const notes = await getAllNotes(userId);
    res.status(200).json({ notes });
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.post('/', async (req, res) => {
  const { userId } = req.user;
  const { text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    await addNote(userId, text);
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.get('/:id', async (req, res) => {
  const noteId = req.path.slice(1);
  const { userId } = req.user;

  if (!noteId || !userId) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    const note = await getNote(noteId, userId);
    res.status(200).json({ note });
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.patch('/:id', async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!userId || !id) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    await checkNoteById(id, userId);
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.delete('/:id', async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!userId || !id) {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    await deleteNoteById(id, userId);
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = {
  notesRouter: router,
};
