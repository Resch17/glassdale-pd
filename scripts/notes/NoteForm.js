import { getNotes, useNotes, saveNote, editNote } from './NoteProvider.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.noteFormContainer');

const render = () => {
  contentTarget.innerHTML = `
  <div class="form-control isHidden">
    <input type="hidden" class="note-id" value="">
    <label for="noteAuthor">Author: </label>
    <input type="text" name="note-author" id="noteAuthor" autocomplete="off">
    <label for="noteForm--criminal">Suspect: </label>
    <select id="noteForm--criminal" class="criminalSelect">
      <option value="">Select a criminal...</option>
    </select>
    <label for="noteText">Note: </label>
    <textarea name="note-text" id="noteText" cols="30" rows="10"></textarea>
  </div>
  <div class="button-group">
    <button id="addNote" class="">Add Note</button>
    <button id="closeNoteForm" class="isHidden">Close Form</button>
    <button id="saveNote" class="isHidden">Save Note</button>
    <button id="viewNotes">View Notes</button>
  </div>
  `;

  const criminalSelect = document.querySelector('.criminalSelect');
  getCriminals().then(() => {
    let criminals = useCriminals();
    criminalSelect.innerHTML += criminals
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((criminal) => {
        return `<option value="${criminal.id}">${criminal.name}</option>`;
      })
      .join('');
  });
};

export const NoteForm = () => {
  render();
};

eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === 'saveNote') {
    let noteAuthor = document.getElementById('noteAuthor');
    let noteSuspect = document.querySelector('.criminalSelect');
    let noteDate = new Date();
    let noteText = document.getElementById('noteText');
    let noteId = document.querySelector('.note-id');

    // validate that form values are not empty, and that hidden id input IS empty (i.e. it's a new note)
    if (
      noteAuthor.value !== '' &&
      noteText.value !== '' &&
      noteSuspect.value !== '' &&
      noteId.value === ''
    ) {
      const newNote = {
        author: noteAuthor.value,
        criminalId: parseInt(noteSuspect.value),
        date: noteDate,
        text: noteText.value,
        timestamp: Date.now(),
      };

      saveNote(newNote);

      noteAuthor.value = '';
      noteSuspect.value = '';
      noteText.value = '';
    } else if (
      // validate that form values aren't empty and that hidden id input is NOT empty (i.e. it's an edited note)
      noteAuthor.value !== '' &&
      noteText.value !== '' &&
      noteSuspect.value !== '' &&
      noteId.value > 0
    ) {
      const editedNote = {
        author: noteAuthor.value,
        criminalId: noteSuspect.value,
        date: noteDate,
        text: noteText.value,
        timestamp: Date.now(),
        id: noteId.value,
      };

      editNote(editedNote);
      noteAuthor.value = '';
      noteSuspect.value = '';
      noteText.value = '';
      noteId.value = '';
    } else {
      alert('Please fill out all the fields');
    }
  }
});

eventHub.addEventListener('editClicked', (evt) => {
  getNotes().then(() => {
    const noteArray = useNotes();
    const idToEdit = evt.detail.chosenNote;
    let noteAuthor = document.getElementById('noteAuthor');
    let noteSuspect = document.querySelector('.criminalSelect');
    let noteDate = new Date();
    let noteText = document.getElementById('noteText');
    let noteId = document.querySelector('.note-id');
    const addNoteButton = document.querySelector('#addNote');
    const closeNoteButton = document.querySelector('#closeNoteForm');
    const saveNoteButton = document.querySelector('#saveNote');
    const formControl = document.querySelector('.form-control');
    let noteToEdit = noteArray.find((note) => note.id === parseInt(idToEdit));

    if (formControl.classList.contains('isHidden')) {
      formControl.classList.remove('isHidden');
      addNoteButton.classList.add('isHidden');
      closeNoteButton.classList.remove('isHidden');
      saveNoteButton.classList.remove('isHidden');
    }
    noteAuthor.value = noteToEdit.author;
    noteSuspect.value = noteToEdit.criminalId;
    noteText.value = noteToEdit.text;
    noteId.value = noteToEdit.id;
  });
});
