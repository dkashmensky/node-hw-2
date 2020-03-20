const express = require('express');
const fs = require('fs');
const router = express.Router();

const notesFilePath = './db/notes.json';

router.get('/notes', (req, res) => {
  const user = req.user;
  const notes = getNotesFile().notes;
  
  const userNotes = notes
    .filter((note) => note.user_id === user.id)
    .sort((a, b) => b.timestamp - a.timestamp);

  res.json(userNotes);
});

router.post('/notes', (req, res) => {
  const user = req.user;
  const { note_text } = req.body;

  const notesJson = getNotesFile();

  const newNote = {
    id: getNextId(notesJson.notes),
    user_id: user.id,
    text: note_text,
    done: false,
    timestamp: Date.now()
  };

  notesJson.notes.push(newNote);
  putNotesFile(notesJson);

  res.status(200).json({status: `Note created successfully. ID: ${newNote.id}`});
});

router.delete('/notes', (req, res) => {
  const { note_id } = req.body;

  const notesJson = getNotesFile();
  const noteIndex = notesJson.notes.findIndex(note => note.id === note_id);
  if(noteIndex != -1) {
    notesJson.notes.splice(noteIndex, 1);
    putNotesFile(notesJson);
    res.status(200).json({status: `Note with ID: ${note_id} deleted successfully.`});
  } else {
    res.status(400).json({status: `Note with ID: ${note_id} not found.`});
  }
});

router.put('/notes', (req, res) => {
  const { note_id, note_text, is_done } = req.body;

  const notesJson = getNotesFile();
  const noteToEdit = notesJson.notes.find(note => note.id === note_id);
  if(noteToEdit) {
    noteToEdit.text = note_text;
    noteToEdit.done = is_done;
    putNotesFile(notesJson);
    res.status(200).json({status: `Note with ID: ${note_id} edited successfully.`});
  } else {
    res.status(400).json({status: `Note with ID: ${note_id} not found.`});
  }
});

router.get('/notes/total', (req, res) => {
  const user = req.user;
  const notes = getNotesFile().notes;
  
  const userNotes = notes.filter((note) => note.user_id === user.id)

  res.json({ notes_count: userNotes.length });
});


// Utility functions
const getNextId = notesArray => {
  if(notesArray.length) {
    const sortedNotes = notesArray.sort((a, b) => b.id - a.id);
    return sortedNotes[0].id + 1;
  }
  
  return 1;
};

const getNotesFile = () => {
  return JSON.parse(fs.readFileSync(notesFilePath, 'utf8'));
};

const putNotesFile = data => {
  fs.writeFileSync(notesFilePath, JSON.stringify(data), 'utf8');
};

module.exports = router;