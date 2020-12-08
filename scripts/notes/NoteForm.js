import { saveNote } from './NoteProvider.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.noteFormContainer');

const render = () => {
  contentTarget.innerHTML = `
  <div class="form-control isHidden">
    <label for="note-suspect">Suspect: </label>
    <input type="text" name="note-suspect" id="noteSuspect">
    <label for="note-date">Date: </label>
    <input type="date" name="note-date" id="noteDate">
    <label for="note-text">Note: </label>
    <textarea name="note-text" id="noteText" cols="30" rows="10"></textarea>
  </div>
  <div class="button-group">
    <button id="addNote" class="">Add Note</button>
    <button id="closeNoteForm" class="isHidden">Close Form</button>
    <button id="saveNote" class="isHidden">Save Note</button>
    <button id="viewNotes">View Notes</button>
  </div>
  `;
};

export const NoteForm = () => {
  render();
};

eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === 'saveNote') {
    let noteSuspect = document.getElementById('noteSuspect');
    let noteDate = document.getElementById('noteDate');
    let noteText = document.getElementById('noteText');

    // validate that form values are not empty
    if (noteSuspect.value && noteDate.value && noteText.value !== '') {
      const newNote = {
        suspect: noteSuspect.value,
        date: noteDate.value,
        text: noteText.value,
        timestamp: Date.now(),
      };

      saveNote(newNote);
      noteSuspect.value = '';
      noteDate.value = '';
      noteText.value = '';
    } else {
      alert('Please fill out all the fields');
    }
  }
});
