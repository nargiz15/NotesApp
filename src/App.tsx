
import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, togglePin, editNote } from './redux/notesSlice';
import { RootState } from './types'; 
import './App.css';

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes);
  const [editText, setEditText] = useState('');

  const handleAddNote = () => {
    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      text: 'New Note',
      pinned: false,
    };
    dispatch(addNote(note));
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleTogglePin = (id: string) => {
    dispatch(togglePin(id));
  };

  const handleEditNote = (id: string, newText: string) => {
    dispatch(editNote({ id, newText }));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <button className='addnote'  onClick={handleAddNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <input
              type="text"
              value={note.text}
              onChange={e => handleEditNote(note.id, e.target.value)}
            />
            <span style={{ fontWeight: note.pinned ? 'bold' : 'normal' }}>{note.text}</span>{' '}
            {note.pinned ? (
              <button onClick={() => handleTogglePin(note.id)}>Unpin</button>
            ) : (
              <button className='pinbtn' onClick={() => handleTogglePin(note.id)}>Pin</button>
            )}
            <button className='deletebtn' onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

