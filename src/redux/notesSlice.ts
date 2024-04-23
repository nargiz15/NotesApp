
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: string;
  text: string;
  pinned: boolean;
}

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload);
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const note = state.find(note => note.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
      }
    },
    editNote: (state, action: PayloadAction<{ id: string; newText: string }>) => {
      const { id, newText } = action.payload;
      const note = state.find(note => note.id === id);
      if (note) {
        note.text = newText;
      }
    },
  },
});

export const { addNote, deleteNote, togglePin, editNote } = notesSlice.actions;
export default notesSlice.reducer;
