import { getNotes, useNotes } from './NoteProvider.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js';
const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.notesContainer');

let criminals = [];

const fillCriminalSelect = () => {
  const criminalSelect = document.querySelector('.criminalSelect');
  getCriminals().then(() => {
    criminals = useCriminals();
    criminalSelect.innerHTML += criminals
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((criminal) => {
        return `<option value="${criminal.id}">${criminal.name}</option>`;
      })
      .join('');
  });
};

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
      viewNotesButton.innerHTML = 'Close Notes';
      renderNotes();
    } else {
      contentTarget.innerHTML = '';
      viewNotesButton.innerHTML = 'View Notes';
    }
  });
  fillCriminalSelect();
};

eventHub.addEventListener('noteStateChanged', () => {
  if (contentTarget.innerHTML !== '') {
    renderNotes();
  }
});

const renderNotes = () => {
  getNotes()
    .then(getCriminals)
    .then(() => {
      const noteArray = useNotes();
      const criminalArray = useCriminals();
      render(noteArray, criminalArray);
    });
};

const render = (noteCollection, criminalCollection) => {
  contentTarget.innerHTML = noteCollection
    .map((note) => {
      const relatedCriminal = criminalCollection.find(
        (criminal) => criminal.id === parseInt(note.criminalId)
      );

      return `
      <section class="note-card">
        <h4>Detective's Note</h4>
        <p><strong>Author: </strong>${note.author}</p>
        <p><strong>Suspect: </strong>${relatedCriminal.name}</p>
        <p><strong>Date: </strong>${new Date(note.date).toLocaleDateString(
          'en-US'
        )}</p>
        <p>${note.text}</p>
      </section>
    `;
    })
    .join('');
};
