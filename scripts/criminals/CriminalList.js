import { Criminal } from "./Criminal.js";
import { useCriminals, getCriminals } from "./CriminalProvider.js";

const eventHub = document.querySelector(".container");
const criminalTarget = document.querySelector(".criminalsContainer");

eventHub.addEventListener("crimeChosen", (event) => {
  if (event.detail.crimeThatWasChosen !== "0") { // validate that an option was chosen, not the default
    const crime = event.detail.crimeThatWasChosen; // assign the crime from the custom event detail to a variable
    const matchingCriminals = appStateCriminals.filter(
      (person) => person.conviction === crime // find the criminals who are convicted of that crime
    );
    render(matchingCriminals); // render the list of matching criminals
  } else {
    render(appStateCriminals);
  }
});

eventHub.addEventListener("officerChosen", (event) => {
  if (event.detail.officerThatWasChosen !== "0") {
    // validate that an option was chosen, not the default
    const officer = event.detail.officerThatWasChosen; // assign the officer from the custom event payload to a variable
    const matchingCriminals = appStateCriminals.filter(
      (person) => person.arrestingOfficer === officer // find the criminals arrested by the Officer
    );
    render(matchingCriminals); // render the list of matching criminals
  } else {
    // render the entire criminal list if the default option is chosen
    render(appStateCriminals);
  }
});

eventHub.addEventListener("associateChosen", (event) => {
  if (event.detail.chosenCriminal !== 0) {
    const criminalId = event.detail.chosenCriminal;
    const selectedCriminal = appStateCriminals.find(
      (person) => person.id == criminalId
    );
    const associates = selectedCriminal.known_associates;
    const displayAssociates = () => {
      const knownAssociates = associates.map((x) => {
        return `Associate: ${x.name} - Alibi: ${x.alibi}\n`;
      });
      return `${
        selectedCriminal.name
      }'s Known Associates:\n${knownAssociates.join("")}`;
    };

    alert(displayAssociates());
  }
});

let appStateCriminals = [];

const render = (criminalCollection) => {
  criminalTarget.innerHTML = `
  ${criminalCollection.map((criminal) => Criminal(criminal)).join("")}
  `;
};

export const criminalList = () => {
  getCriminals().then(() => {
    appStateCriminals = useCriminals();
    render(appStateCriminals);
  });
};
