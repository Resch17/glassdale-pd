let criminalFacilities = [];

export const useCriminalFacilities = () => criminalFacilities.slice();

export const getCriminalFacilities = () => {
  return fetch('https://criminals.glassdale.us/criminalFacilities')
    .then((res) => res.json())
    .then((apiData) => {
      criminalFacilities = apiData;
    });
};
