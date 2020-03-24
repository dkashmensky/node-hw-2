const express = require('express');
const utils = require('./utils');

const router = express.Router();
const notesFilePath = './db/notes.json';

router.get('/notes', (req, res) => {
  const { user } = req;
  const { notes } = utils.getFile(notesFilePath);

  const userNotes = notes
    .filter(note => note.user_id === user.id)
    .sort((a, b) => b.timestamp - a.timestamp);

  res.json(userNotes);
});

router.post('/notes', (req, res) => {
  const { user } = req;
  const { text } = req.body;

  const notesJson = utils.getFile(notesFilePath);

  const newNote = {
    id: utils.getNextId(notesJson.notes),
    user_id: user.id,
    text,
    done: false,
    timestamp: Date.now(),
  };

  notesJson.notes.push(newNote);
  utils.putFile(notesJson, notesFilePath);

  res.status(200).json({
    status: `Note created successfully. ID: ${newNote.id}`,
  });
});

router.delete('/notes', (req, res) => {
  const { id } = req.body;

  const notesJson = utils.getFile(notesFilePath);
  const noteIndex = notesJson.notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {
    notesJson.notes.splice(noteIndex, 1);
    utils.putFile(notesJson, notesFilePath);
    res.status(200).json({
      status: `Note with ID: ${id} deleted successfully.`,
    });
  } else {
    res.status(400).json({
      status: `Note with ID: ${id} not found.`,
    });
  }
});

router.put('/notes', (req, res) => {
  const { id, text, done } = req.body;

  const notesJson = utils.getFile(notesFilePath);
  const noteToEdit = notesJson.notes.find(note => note.id === id);
  if (noteToEdit) {
    noteToEdit.text = text;
    noteToEdit.done = done;
    utils.putFile(notesJson, notesFilePath);
    res.status(200).json({
      status: `Note with ID: ${id} edited successfully.`,
    });
  } else {
    res.status(400).json({
      status: `Note with ID: ${id} not found.`,
    });
  }
});

router.get('/notes/total', (req, res) => {
  const { user } = req;
  const { notes } = utils.getFile(notesFilePath);

  const userNotes = notes.filter(note => note.user_id === user.id);

  res.json({ notes_count: userNotes.length });
});

module.exports = router;
