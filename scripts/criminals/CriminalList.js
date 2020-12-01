import { Criminal } from "./Criminal.js";
import { useCriminals, getCriminals } from "./CriminalProvider.js";

export const criminalList = () => {
  getCriminals().then(() => {
    const criminalTarget = document.querySelector(".criminalsContainer");
    const criminalArray = useCriminals();

    for (let criminal of criminalArray) {
      let criminalHTML = Criminal(criminal);
      criminalTarget.innerHTML += criminalHTML;
    }
  });
};
