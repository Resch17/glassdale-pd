const eventHub = document.querySelector('.container');

const dispatchStateChangeEvent = () => {
  const noteStateChangedEvent = new CustomEvent('noteStateChanged');
  eventHub.dispatchEvent(noteStateChangedEvent);
};

// this variable holds the notes APPLICATION STATE
let notes = [];

// this function gets our API STATE notes and updates the APPLCIATION STATE variable to match
export const getNotes = () => {
  return fetch('http://localhost:8088/notes')
    .then((response) => response.json())
    .then((parsedNotes) => {
      notes = parsedNotes;
    });
};

export const useNotes = () => notes.slice();

export const saveNote = (note) => {
  return fetch('http://localhost:8088/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(getNotes)
    .then(dispatchStateChangeEvent);
};

export const deleteNote = (noteId) => {
  return fetch(`http://localhost:8088/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(getNotes)
    .then(dispatchStateChangeEvent);
};

export const editNote = (note) => {
  return fetch(`http://localhost:8088/notes/${note.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(getNotes)
    .then(dispatchStateChangeEvent);
};
