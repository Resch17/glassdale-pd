import { useConvictions } from '../convictions/ConvictionProvider.js';
import { Criminal } from './Criminal.js';
import { useCriminals, getCriminals } from './CriminalProvider.js';
import {
  getCriminalFacilities,
  useCriminalFacilities,
} from '../facilities/CriminalFacilityProvider.js';
import {
  getFacilities,
  useFacilities,
} from '../facilities/FacilityProvider.js';

const eventHub = document.querySelector('.container');
const criminalTarget = document.querySelector('.criminalsContainer');

eventHub.addEventListener('crimeChosen', (event) => {
  let criminals = useCriminals();
  let crimes = useConvictions();
  let matchingCriminals

  // validate that an option was chosen, not the default
  if (event.detail.crimeThatWasChosen !== '0') {
    // assign the crime from the custom event detail to a variable by matching its id up with the crime names from the crime list
    const crime = crimes.find(
      (crime) => crime.id === parseInt(event.detail.crimeThatWasChosen)
    );

    // find the criminals who are convicted of that crime
    matchingCriminals = criminals.filter(
      (person) => person.conviction === crime.name
    );
    const facilities = useFacilities();
    const crimFac = useCriminalFacilities();
    
    // render the list of matching criminals (including facility info to fulfill refactored renderList function)
    renderList(matchingCriminals, facilities, crimFac);
  } else {
    // render default list if default crime is chosen (no crime is chosen)
    criminalList();
  }
});

eventHub.addEventListener('officerChosen', (event) => {
  let criminals = useCriminals();
  let matchingCriminals;
  if (event.detail.officerThatWasChosen !== '0') {
    const officer = event.detail.officerThatWasChosen;
    matchingCriminals = criminals.filter(
      (person) => person.arrestingOfficer === officer
    );
    const facilities = useFacilities();
    const crimFac = useCriminalFacilities();
    renderList(matchingCriminals, facilities, crimFac);
  } else {
    criminalList();
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
      const knownAssociates = associates
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((x) => {
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
  criminalList();
});

const renderList = (criminalCollection, allFacilities, allRelationships) => {
  criminalTarget.innerHTML = criminalCollection
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((criminalObject) => {
      const facilityRelationshipsForThisCriminal = allRelationships.filter(
        (cf) => cf.criminalId === criminalObject.id
      );

      const facilities = facilityRelationshipsForThisCriminal.map((cf) => {
        const matchingFacilityObject = allFacilities.find(
          (facility) => facility.id === cf.facilityId
        );
        return matchingFacilityObject;
      });

      return Criminal(criminalObject, facilities);
    })
    .join('');
};

export const criminalList = () => {
  getCriminals().then(
    getFacilities()
      .then(getCriminalFacilities)
      .then(() => {
        const facilities = useFacilities();
        const crimFac = useCriminalFacilities();
        const criminals = useCriminals();

        renderList(criminals, facilities, crimFac);
      })
  );
};
