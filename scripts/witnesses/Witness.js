export const Witness = (witness) => {
  return `
  <section class="witness-card">
    <p><strong>Witness Name: </strong>${witness.name}</p>
    <p><strong>Statement: </strong>${witness.statements}</p>
  </section>`;
};
