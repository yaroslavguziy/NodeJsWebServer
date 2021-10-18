const express = require('express');
const router = express.Router();

const notesController = require('../controllers/noteController');

router.post('/', notesController.addUserNote);
router.get('/:id', notesController.getUserNoteById);
router.get('/', notesController.getUserNotes);
router.patch('/:id', notesController.checkUserNoteById);
router.put('/:id', notesController.updateUserNoteById);
router.delete('/:id', notesController.deleteUserNoteById);

module.exports = router;
