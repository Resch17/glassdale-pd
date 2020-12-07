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
    let noteSuspectValue = document.getElementById('noteSuspect').value;
    let noteDateValue = document.getElementById('noteDate').value;
    let noteTextValue = document.getElementById('noteText').value;

    // validate that form values are not empty
    if (noteSuspectValue && noteDateValue && noteTextValue !== '') {
      const newNote = {
        suspect: noteSuspectValue,
        date: noteDateValue,
        text: noteTextValue,
        timestamp: Date.now(),
      };

      saveNote(newNote);

      // reset form fields to blank
      noteSuspectValue = '';
      noteDateValue = '';
      noteTextValue = '';
    }
  }
});
