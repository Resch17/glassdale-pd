import { Criminal } from "./Criminal.js";
import { useCriminals, getCriminals } from "./CriminalProvider.js";

const eventHub = document.querySelector(".container");
const criminalTarget = document.querySelector(".criminalsContainer");

eventHub.addEventListener("crimeChosen", (event) => {
  if (event.detail.crimeThatWasChosen !== "0") {
    const crime = event.detail.crimeThatWasChosen;
    const matchingCriminals = criminals.filter(
      (person) => person.conviction === crime
    );
    render(matchingCriminals);
  } else {
    render(criminals);
  }
});

let criminals = [];

const render = (criminalCollection) => {
  criminalTarget.innerHTML = `
  ${criminalCollection.map((criminal) => Criminal(criminal)).join("")}
  `;
};

export const criminalList = () => {
  getCriminals().then(() => {
    const criminalArray = useCriminals();
    criminals = criminalArray.slice();
    render(criminals);
  });
};
