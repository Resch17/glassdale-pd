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
import { facilityList } from '../facilities/FacilityList.js';
import { AssociateDialog } from '../associates/AssociateDialog.js';

const eventHub = document.querySelector('.container');
const criminalTarget = document.querySelector('.criminalsContainer');

// variables to hold component state
let criminals = [];
let facilities = [];
let crimFac = [];

eventHub.addEventListener('crimeChosen', (event) => {
  // reset component state criminals
  criminals = useCriminals();

  let crimes = useConvictions();
  let matchingCriminals;

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

    // set component state criminals to matchingCriminals
    criminals = matchingCriminals;

    // render the list of matching criminals (including facility info to fulfill refactored renderList function)
    render();
  } else {
    // render default list if default crime is chosen (no crime is chosen)
    criminalList();
  }
});

eventHub.addEventListener('officerChosen', (event) => {
  // reset component state criminals
  criminals = useCriminals();

  let matchingCriminals;
  if (event.detail.officerThatWasChosen !== '0') {
    const officer = event.detail.officerThatWasChosen;
    matchingCriminals = criminals.filter(
      (person) => person.arrestingOfficer === officer
    );

    // set component state criminals to matchingCriminals
    criminals = matchingCriminals;
    render();
  } else {
    criminalList();
  }
});

eventHub.addEventListener('associateChosen', (event) => {
  criminals = useCriminals();
  const dialogElement = document.querySelector('.criminal-associates');
  if (event.detail.chosenCriminal !== 0) {
    const criminalId = event.detail.chosenCriminal;
    const selectedCriminal = criminals.find(
      (person) => person.id === parseInt(criminalId)
    );
    AssociateDialog(selectedCriminal);
    dialogElement.showModal();
    document.querySelector('#closeModal').addEventListener('click', () => {
      dialogElement.close();
    });
    window.onclick = function (event) {
      if (event.target === dialogElement) dialogElement.close();
    };
  }
});

eventHub.addEventListener('showCriminals', () => {
  criminalList();
});

eventHub.addEventListener('facilitiesButtonClicked', () => {
  criminalTarget.classList.toggle('isHidden');
  facilityList();
  document.querySelector('.facilityContainer').classList.toggle('isHidden');
});

const render = () => {
  criminalTarget.innerHTML = criminals
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((criminalObject) => {
      const facilityRelationshipsForThisCriminal = crimFac.filter(
        (cf) => cf.criminalId === criminalObject.id
      );

      const matchingFacilities = facilityRelationshipsForThisCriminal.map(
        (cf) => {
          const matchingFacilityObject = facilities.find(
            (facility) => facility.id === cf.facilityId
          );
          return matchingFacilityObject;
        }
      );

      return Criminal(criminalObject, matchingFacilities);
    })
    .join('');
};

export const criminalList = () => {
  getCriminals()
    .then(getFacilities)
    .then(getCriminalFacilities)
    .then(() => {
      facilities = useFacilities();
      crimFac = useCriminalFacilities();
      criminals = useCriminals();
      render();
    });
};
