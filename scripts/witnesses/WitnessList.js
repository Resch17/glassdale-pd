import { Witness } from "./Witness.js";
import { useWitnesses, getWitnesses } from "./WitnessProvider.js";

const eventHub = document.querySelector(".container");
const witnessTarget = document.querySelector(".criminalsContainer");

const render = (witnessCollection) => {
  witnessTarget.innerHTML = witnessCollection
    .map((witness) => Witness(witness))
    .join("");
};

export const witnessList = () => {
  eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "showWitnesses") {
      witnessTarget.innerHTML = "";
      getWitnesses().then(() => {
        let witnesses = useWitnesses();
        render(witnesses);
      });
    }
  });
};
