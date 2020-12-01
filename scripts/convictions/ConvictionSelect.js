import { useConvictions, getConvictions } from "./ConvictionProvider.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector(".filters__crime");

eventHub.addEventListener("change", (event) => {
  if (event.target.id === "crimeSelect") {
    const customEvent = new CustomEvent("crimeChosen", {
      detail: {
        crimeThatWasChosen: event.target.value,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});

const render = convictionsCollection => {
  contentTarget.innerHTML = `
    <select class="dropdown" id="crimeSelect">
      <option value="0">Please select a crime...</option>
      ${convictionsCollection.map((crime) => {
        return `<option value="${crime.name}">${crime.name}</option>`;
      })}
    </select>
    `;
}

export const convictionSelect = () => {
  getConvictions().then(() => {
    const crimeArray = useConvictions();
    render(crimeArray)    
  });
};
