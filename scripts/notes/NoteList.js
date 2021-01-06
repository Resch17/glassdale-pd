import { getNotes, useNotes, deleteNote } from './NoteProvider.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js';
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
      viewNotesButton.innerHTML = 'Close Notes';
      renderNotes();
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

eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id.startsWith('deleteNote--')) {
    const [unused, id] = clickEvent.target.id.split('--');

    deleteNote(id).then(() => {
      renderNotes();
    });
  }
});

eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id.startsWith('editNote--')) {
    const [unused, id] = clickEvent.target.id.split('--');
    const customEvent = new CustomEvent('editClicked', {
      detail: {
        chosenNote: id,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});

const renderNotes = () => {
  getNotes()
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
        (criminal) => criminal.id === note.criminalId
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
        <div class="text-center">
          <button id="deleteNote--${note.id}">Delete</button>
          <button id="editNote--${note.id}">Edit</button>
        </div>
      </section>
    `;
    })
    .join('');
};
