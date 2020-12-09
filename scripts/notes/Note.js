// TODO: delete this module after being sure it isn't being used

export const Note = (note) => {
  return `
  <section class="note-card">
    <h4>Detective's Note</h4>
    <p><strong>Author: </strong>${note.author}</p>
    <p><strong>Date: </strong>${new Date(note.date).toLocaleDateString(
      'en-US'
    )}</p>
    <p>${note.text}</p>
  </section>
  `;
};
