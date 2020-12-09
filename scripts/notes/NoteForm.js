import { saveNote } from './NoteProvider.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.noteFormContainer');

const render = () => {
  contentTarget.innerHTML = `
  <div class="form-control isHidden">
    <label for="noteAuthor">Author: </label>
    <input type="text" name="note-author" id="noteAuthor">
    <label for="noteForm--criminal">Suspect: </label>
    <select id="noteForm--criminal" class="criminalSelect">
      <option value="0">Select a criminal...</option>
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

    // validate that form values are not empty
    if (noteAuthor.value && noteText.value !== '') {
      const newNote = {
        author: noteAuthor.value,
        criminalId: noteSuspect.value,
        date: noteDate,
        text: noteText.value,
        timestamp: Date.now(),
      };

      saveNote(newNote);
      noteAuthor.value = '';
      noteSuspect.value = '';
      noteText.value = '';
    } else {
      alert('Please fill out all the fields');
    }
  }
});
