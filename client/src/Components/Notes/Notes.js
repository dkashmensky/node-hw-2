import React, { useEffect, useState } from 'react';
import './Notes.scss';
import Note from '../../Components/Note/Note';

const Notes = () => {
  const [ notes, setNotes ] = useState([]);
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${ window.localStorage.getItem('jwt_token') }`,
    },
  };

  const fetchNotes = async () => {
    await fetch('http://localhost:8080/api/notes', fetchConfig)
      .then(json)
      .then(setData)
      .catch(logError);
  }

  const json = response => response.json();
  const setData = json => setNotes(json);
  const logError = err => console.log(err);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="Notes">
      <header className="Notes__header">Total Notes: { notes.length } / In Progress: { notes.filter(note => !note.done).length }</header>
      <ul className="Notes__list">
        { notes.map((note, index) => <Note key={ note.id } note={ note } callback={ fetchNotes } index={ index } />) }
      </ul>
    </div>
  )
}

export default Notes;
