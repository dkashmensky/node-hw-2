const express = require('express');
const router = express.Router();
const utils = require('./utils');

const notesFilePath = './db/notes.json';

router.get('/notes', (req, res) => {
  const user = req.user;
  const notes = utils.getFile(notesFilePath).notes;
  
  const userNotes = notes
    .filter((note) => note.user_id === user.id)
    .sort((a, b) => b.timestamp - a.timestamp);

  res.json(userNotes);
});

router.post('/notes', (req, res) => {
  const user = req.user;
  const { note_text } = req.body;

  const notesJson = utils.getFile(notesFilePath);

  const newNote = {
    id: utils.getNextId(notesJson.notes),
    user_id: user.id,
    text: note_text,
    done: false,
    timestamp: Date.now()
  };

  notesJson.notes.push(newNote);
  utils.putFile(notesJson, notesFilePath);

  res.status(200).json({status: `Note created successfully. ID: ${newNote.id}`});
});

router.delete('/notes', (req, res) => {
  const { note_id } = req.body;

  const notesJson = utils.getFile(notesFilePath);
  const noteIndex = notesJson.notes.findIndex(note => note.id === note_id);
  if(noteIndex != -1) {
    notesJson.notes.splice(noteIndex, 1);
    utils.putFile(notesJson, notesFilePath);
    res.status(200).json({status: `Note with ID: ${note_id} deleted successfully.`});
  } else {
    res.status(400).json({status: `Note with ID: ${note_id} not found.`});
  }
});

router.put('/notes', (req, res) => {
  const { note_id, note_text, is_done } = req.body;

  const notesJson = utils.getFile(notesFilePath);
  const noteToEdit = notesJson.notes.find(note => note.id === note_id);
  if(noteToEdit) {
    noteToEdit.text = note_text;
    noteToEdit.done = is_done;
    utils.putFile(notesJson, notesFilePath);
    res.status(200).json({status: `Note with ID: ${note_id} edited successfully.`});
  } else {
    res.status(400).json({status: `Note with ID: ${note_id} not found.`});
  }
});

router.get('/notes/total', (req, res) => {
  const user = req.user;
  const notes = utils.getFile(notesFilePath).notes;
  
  const userNotes = notes.filter((note) => note.user_id === user.id)

  res.json({ notes_count: userNotes.length });
});

module.exports = router;