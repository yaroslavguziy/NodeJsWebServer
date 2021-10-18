const Note = require('../models/noteModel');

class NoteController {
  async getUserNotes(req, res) {
    try {
      const { offset, limit } = req.query;
      const options = {
        skip: offset ? parseInt(offset) : 0,
        limit: limit ? parseInt(limit) : 0,
      };
      const notes = await Note.find({ userId: req.user.userId }).skip(options.skip).limit(options.limit);

      return res.status(200).json({
        offset: paginationOps.skip,
        limit: paginationOps.limit,
        count: notes.length,
        notes,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async addUserNote(req, res) {
    try {
      const { userId } = req.user;
      const noteText = req.body.text;

      if (!noteText) {
        return res.status(400).json({ message: 'Add text' });
      }

      const addNote = new Note({
        userId,
        completed: false,
        text: noteText,
        createdDate: Date.now(),
      });

      await addNote.save();

      return res.status(200).json({ message: 'Success' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async checkUserNoteById(req, res) {
    try {
      const id = req.params.id;
      const note = await Note.findOne({ _id: id });

      note.completed = !note.completed;

      await note.save();

      res.status(200).json({ message: 'Success' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async deleteUserNoteById(req, res) {
    try {
      const id = req.params.id;

      await Note.findByIdAndRemove({ _id: id });

      res.status(200).json({ message: 'Success' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async getUserNoteById(req, res) {
    try {
      const id = req.params.id;

      const note = await Note.findOne({ _id: id });

      if (note) {
        res.status(200).json({ note });
      } else {
        res.status(400).json({ message: 'Not found' });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  async updateUserNoteById(req, res) {
    try {
      const { userId } = req.user;
      const id = req.params.id;
      const updateText = req.body.text;

      await Note.findOneAndUpdate({ _id: id, userId }, { text: updateText });

      res.status(200).json({ message: 'Success' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new NoteController();
