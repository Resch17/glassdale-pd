export const Note = (note) => {
  return `
  <section class="note-card">
    <h4>Detective's Note</h4>
    <p><strong>Suspect: </strong>${note.suspect}</p>
    <p><strong>Date: </strong>${note.date}</p>
    <p>${note.text}</p>
  </section>
  `
};
