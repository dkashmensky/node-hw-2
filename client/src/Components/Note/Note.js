import React, { useState } from 'react';
import './Note.scss';
import DeleteIcon from '../../Images/delete.png';
import CheckedIcon from '../../Images/checked.png';
import UncheckedIcon from '../../Images/unchecked.png';
import AddIcon from '../../Images/add.png';

const Note = props => {
  const note = props.note;
  const refresh = props.callback;
  const index = props.index;
  const [ noteText, setText ] = useState(note.text);
  const [ noteState, setNoteState] = useState(note.done);

  const editNote = (ev) => {
    let isChecked = false;
    if(ev.currentTarget.classList.contains('Note__check')) {
      isChecked = true;
      setNoteState(!noteState);
    }

    fetch('http://localhost:8080/api/notes', { 
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${ window.localStorage.getItem('jwt_token') }`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: note.id,
        user_id: note.user_id,
        text: noteText,
        done: isChecked ? !noteState : noteState,
        timestamp: note.timestamp,
      })
    })
      .then(response => response.json())
      .then(json => console.log(json.status))
      .catch(err => console.log(err));

    refresh();
  }

  const deleteNote = () => { 
    fetch('http://localhost:8080/api/notes', { 
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${ window.localStorage.getItem('jwt_token') }`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: note.id,
      })
    })
      .then(response => response.json())
      .then(json => console.log(json.status))
      .catch(err => console.log(err));

    refresh();
  }

  const createNote = () => {
    fetch('http://localhost:8080/api/notes', {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${ window.localStorage.getItem('jwt_token') }`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        text: "",
      })
    })
      .then(response => response.json())
      .then(json => console.log(json.status))
      .catch(err => console.log(err));

    refresh();
  }

  const textChange = (ev) => {
    setText(ev.currentTarget.value)
  }

  return (
    <li className="Note">
      <textarea className="Note__text" type="text" onBlur={ editNote } onChange={ textChange } value={ noteText } />
      <div className="Note__wrapper">
        <img src={ DeleteIcon } className="Note__delete" onClick={ deleteNote } alt="Delete Icon" />
      </div>
      <div className="Note__wrapper">
        <img src={ noteState ? CheckedIcon : UncheckedIcon } className="Note__check" onClick={ editNote } alt="Check Icon" />
      </div>
      { index === 0 ? <div className="Note__wrapper"><img src={ AddIcon } className="Note__add" onClick={ createNote } alt="Add Icon" /></div> : `` }
    </li>
  );
}

export default Note;