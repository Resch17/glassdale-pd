const eventHub = document.querySelector('.container');

export const Criminal = (criminal, facilities) => {
  return `<section class="criminal-card">
    <h4>${criminal.name}</h4>
    <p>Age: ${criminal.age}</p>
    <p>Crime: ${criminal.conviction}</p>
    <p>Term start: ${new Date(criminal.incarceration.start).toLocaleDateString(
      'en-US'
    )}</p>
    <p>Term end: ${new Date(criminal.incarceration.end).toLocaleDateString(
      'en-US'
    )}</p>
    <div>
      <h3>Facilities</h3>
      <ul class=>
        ${facilities.map((f) => `<li> - ${f.facilityName}</li>`).join('')}
      </ul>
    </div>
    <button id="associates--${criminal.id}">Associated Alibis</button>
  </section>`;
};

eventHub.addEventListener('click', (event) => {
  if (event.target.id.startsWith('associates')) {
    const idOfButton = event.target.id;
    const [prefix, criminal] = idOfButton.split('--');

    const customEvent = new CustomEvent('associateChosen', {
      detail: {
        chosenCriminal: criminal,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});
