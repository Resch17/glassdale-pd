import { getFacilities, useFacilities } from './FacilityProvider.js';
import { Facility } from './Facility.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js';
import {
  getCriminalFacilities,
  useCriminalFacilities,
} from './CriminalFacilityProvider.js';

const facilityTarget = document.querySelector('.facilityContainer');

// component state variables
let facilities = [];
let criminals = [];
let crimFac = [];

const render = () => {
  facilityTarget.innerHTML = facilities
    .sort((a, b) => a.facilityName.localeCompare(b.facilityName))
    .map((facilityObject) => {
      const criminalRelationshipsForThisFacility = crimFac.filter(
        (relationship) => relationship.facilityId === facilityObject.id
      );

      const criminalsList = criminalRelationshipsForThisFacility.map(
        (relationship) => {
          const matchingCriminalObject = criminals.find(
            (criminalObject) => criminalObject.id === relationship.criminalId
          );
          return matchingCriminalObject;
        }
      );

      return Facility(facilityObject, criminalsList);
    })
    .join('');
};

export const facilityList = () => {
  getFacilities()
    .then(getCriminals)
    .then(getCriminalFacilities)
    .then(() => {
      // setting component state
      facilities = useFacilities();
      criminals = useCriminals();
      crimFac = useCriminalFacilities();
      render();
    });
};
