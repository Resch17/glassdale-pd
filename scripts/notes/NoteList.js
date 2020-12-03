import { Note } from "./Note.js";
import { getNotes, useNotes } from "./NoteProvider.js";

export const NoteList = () => {
  const viewNotesButton = document.querySelector("#viewNotes");
  const contentTarget = document.querySelector(".notesContainer");
  const addNoteButton = document.querySelector("#addNote");
  const closeNoteButton = document.querySelector("#closeNoteForm");

  addNoteButton.addEventListener("click", () => {
    document.querySelector(".form-control").classList.remove("isHidden");
    document.querySelector("#saveNote").classList.remove("isHidden");
    addNoteButton.classList.add("isHidden");
    closeNoteButton.classList.remove("isHidden");
  });
  
  closeNoteButton.addEventListener("click", () => {
    document.querySelector(".form-control").classList.add("isHidden");
    document.querySelector("#saveNote").classList.add("isHidden");
    addNoteButton.classList.remove("isHidden");
    closeNoteButton.classList.add("isHidden");
  });

  viewNotesButton.addEventListener("click", () => {
    if (contentTarget.innerHTML === "") {
      getNotes().then(() => {
        const noteArray = useNotes();

        for (let note of noteArray) {
          let noteHTML = Note(note);
          contentTarget.innerHTML += noteHTML;
          viewNotesButton.innerHTML = "Close Notes";
        }
      });
    } else {
      contentTarget.innerHTML = "";
      viewNotesButton.innerHTML = "View Notes";
    }
  });
};
