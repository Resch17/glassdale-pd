import { useConvictions } from '../convictions/ConvictionProvider.js';
import { Criminal } from './Criminal.js';
import { useCriminals, getCriminals } from './CriminalProvider.js';

const eventHub = document.querySelector('.container');
const criminalTarget = document.querySelector('.criminalsContainer');

eventHub.addEventListener('crimeChosen', (event) => {
  let criminals = useCriminals();
  let crimes = useConvictions();

  // validate that an option was chosen, not the default
  if (event.detail.crimeThatWasChosen !== '0') {
    // assign the crime from the custom event detail to a variable by matching its id up with the crime names from the crime list
    const crime = crimes.find(
      (crime) => crime.id === parseInt(event.detail.crimeThatWasChosen)
    );

    // find the criminals who are convicted of that crime
    const matchingCriminals = criminals.filter(
      (person) => person.conviction === crime.name
    );

    // render the list of matching criminals
    render(matchingCriminals);
  } else {
    render(criminals);
  }
});

eventHub.addEventListener('officerChosen', (event) => {
  let criminals = useCriminals();
  if (event.detail.officerThatWasChosen !== '0') {
    const officer = event.detail.officerThatWasChosen;
    const matchingCriminals = criminals.filter(
      (person) => person.arrestingOfficer === officer
    );
    render(matchingCriminals);
  } else {
    render(criminals);
  }
});

eventHub.addEventListener('associateChosen', (event) => {
  let criminals = useCriminals();
  if (event.detail.chosenCriminal !== 0) {
    const criminalId = event.detail.chosenCriminal;
    const selectedCriminal = criminals.find(
      (person) => person.id === parseInt(criminalId)
    );
    const associates = selectedCriminal.known_associates;
    const displayAssociates = () => {
      const knownAssociates = associates.map((x) => {
        return `Associate: ${x.name} - Alibi: ${x.alibi}\n`;
      });
      return `${
        selectedCriminal.name
      }'s Known Associates:\n${knownAssociates.join('')}`;
    };

    alert(displayAssociates());
  }
});

eventHub.addEventListener('showCriminals', () => {
  let criminals = useCriminals();
  render(criminals);
});

const render = (criminalCollection) => {
  criminalTarget.innerHTML = `
  ${criminalCollection
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((criminal) => Criminal(criminal))
    .join('')}
  `;
};

export const criminalList = () => {
  getCriminals().then(() => {
    let criminals = useCriminals();
    render(criminals);
  });
};
