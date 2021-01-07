import { getFacilities, useFacilities } from './FacilityProvider.js';
import { Facility } from './Facility.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js';
import {
  getCriminalFacilities,
  useCriminalFacilities,
} from './CriminalFacilityProvider.js';

const facilityTarget = document.querySelector('.facilityContainer');

const render = (facilityCollection, criminalCollection, allRelationships) => {
  facilityTarget.innerHTML = facilityCollection
    .sort((a, b) => a.facilityName.localeCompare(b.facilityName))
    .map((facilityObject) => {
      const criminalRelationshipsForThisFacility = allRelationships.filter(
        (relationship) => relationship.facilityId === facilityObject.id
      );

      const criminals = criminalRelationshipsForThisFacility.map(
        (relationship) => {
          const matchingCriminalObject = criminalCollection.find(
            (criminalObject) => criminalObject.id === relationship.criminalId
          );
          return matchingCriminalObject;
        }
      );

      return Facility(facilityObject, criminals);
    })
    .join('');
};

export const facilityList = () => {
  getFacilities()
    .then(getCriminals)
    .then(getCriminalFacilities)
    .then(() => {
      const facilities = useFacilities();
      const criminals = useCriminals();
      const crimFac = useCriminalFacilities();
      render(facilities, criminals, crimFac);
    });
};
