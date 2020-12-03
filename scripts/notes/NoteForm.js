import { saveNote } from "./NoteProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".noteFormContainer");

const render = () => {
  contentTarget.innerHTML = `
  <div class="form-control isHidden">
    <label for="note-suspect">Suspect: </label>
    <input type="text" name="note-suspect" id="noteSuspect">
    <label for="note-date">Date: </label>
    <input type="text" name="note-date" id="noteDate">
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

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveNote") {
    let noteSuspectField = document.getElementById("noteSuspect").value;
    let noteDateField = document.getElementById("noteDate").value;
    let noteTextField = document.getElementById("noteText").value;

    if (noteSuspectField && noteDateField && noteTextField !== "") {
      const newNote = {
        suspect: noteSuspectField,
        date: noteDateField,
        text: noteTextField,
      };

      saveNote(newNote);
      noteSuspectField = "";
      noteDateField = "";
      noteTextField = "";
    }
  }
});