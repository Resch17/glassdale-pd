const contentTarget = document.querySelector('.facility__button');
const eventHub = document.querySelector('.container');

export const DisplayFacilitiesButton = () => {
  contentTarget.innerHTML = `
  <button class="btn" id="showFacilities">Toggle Facilities</button> `;
};

eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === 'showFacilities') {
    const customEvent = new CustomEvent('facilitiesButtonClicked');
    eventHub.dispatchEvent(customEvent);
  }
});
