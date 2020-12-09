import { useOfficers, getOfficers } from './OfficerProvider.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.filters__officer');

eventHub.addEventListener('change', (event) => {
  if (event.target.id === 'officerSelect') {
    const customEvent = new CustomEvent('officerChosen', {
      detail: {
        officerThatWasChosen: event.target.value,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});

const render = (officersCollection) => {
  contentTarget.innerHTML = `
  <select class="dropdown" id="officerSelect">
    <option value="0">Please select an officer...</option>
    ${officersCollection
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((officer) => {
        return `<option value="${officer.name}">${officer.name}</option>`;
      })}
  </select>
  `;
};

export const officerSelect = () => {
  getOfficers().then(() => {
    const officerArray = useOfficers();
    render(officerArray);
  });
};
