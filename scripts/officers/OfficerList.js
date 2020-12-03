import { Officer } from "./Officer.js";
import { useOfficers, getOfficers } from "./OfficerProvider.js";

export const officerList = () => {
  getOfficers().then(() => {
    const officerTarget = document.querySelector(".officersContainer");
    const officerArray = useOfficers();

    for (let officer of officerArray) {
      let officerHTML = Officer(officer);
      officerTarget.innerHTML += officerHTML;
    }
  });
};
