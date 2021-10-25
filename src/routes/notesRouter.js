const express = require('express');
const router = express.Router();

const NoteController = require('../controllers/noteController');

router.post('/', NoteController.addUserNote);
router.get('/:id', NoteController.getUserNoteById);
router.get('/', NoteController.getUserNotes);
router.patch('/:id', NoteController.checkUserNoteById);
router.put('/:id', NoteController.updateUserNoteById);
router.delete('/:id', NoteController.deleteUserNoteById);

module.exports = router;
