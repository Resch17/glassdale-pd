import { getFacilities, useFacilities } from './FacilityProvider.js';
import { Facility } from './Facility.js';
import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js';
import {
  getCriminalFacilities,
  useCriminalFacilities,
} from './CriminalFacilityProvider.js';

const eventHub = document.querySelector('.container');
const facilityTarget = document.querySelector('.facilityContainer');

const render = (facilityCollection, criminalCollection, allRelationships) => {
  facilityTarget.innerHTML = facilityCollection
    .sort((a, b) => a.facilityName.localeCompare(b.facilityName))
    .map((facilityObject) => {
      const criminalRelationshipsForThisFacility = allRelationships.filter(
        (facility) => facility.facilityId === facilityObject.id
      );

      const criminals = criminalRelationshipsForThisFacility.map((cf) => {
        const matchingCriminalObject = criminalCollection.find(
          (criminal) => criminal.id === cf.criminalId
        );
        return matchingCriminalObject;
      });

      return Facility(facilityObject, criminals);
    })
    .join('');
};

export const facilityList = () => {
  getFacilities().then(
    getCriminals()
      .then(getCriminalFacilities)
      .then(() => {
        const facilities = useFacilities();
        const crimFac = useCriminalFacilities();
        const criminals = useCriminals();

        render(facilities, criminals, crimFac);
      })
  );
};
