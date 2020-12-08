import { Note } from './Note.js';
import { getNotes, useNotes } from './NoteProvider.js';
const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.notesContainer');

export const NoteList = () => {
  const addNoteButton = document.querySelector('#addNote');
  const closeNoteButton = document.querySelector('#closeNoteForm');
  const viewNotesButton = document.querySelector('#viewNotes');
  const saveNoteButton = document.querySelector('#saveNote');
  const formControl = document.querySelector('.form-control');

  addNoteButton.addEventListener('click', () => {
    formControl.classList.remove('isHidden');
    saveNoteButton.classList.remove('isHidden');
    addNoteButton.classList.add('isHidden');
    closeNoteButton.classList.remove('isHidden');
  });

  closeNoteButton.addEventListener('click', () => {
    formControl.classList.add('isHidden');
    saveNoteButton.classList.add('isHidden');
    addNoteButton.classList.remove('isHidden');
    closeNoteButton.classList.add('isHidden');
  });

  viewNotesButton.addEventListener('click', () => {
    if (contentTarget.innerHTML === '') {
      getNotes().then(() => {
        viewNotesButton.innerHTML = 'Close Notes';
        renderNotes();
      });
    } else {
      contentTarget.innerHTML = '';
      viewNotesButton.innerHTML = 'View Notes';
    }
  });
};

eventHub.addEventListener('noteStateChanged', () => {
  if (contentTarget.innerHTML !== '') {
    renderNotes();
  }
});

const renderNotes = () => {
  getNotes().then(() => {
    const noteArray = useNotes();
    contentTarget.innerHTML = noteArray.map((note) => Note(note)).join('');
  });
};
