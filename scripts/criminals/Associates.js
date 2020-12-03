const eventHub = document.querySelector(".container");

export const associatesFunction = () => {
  eventHub.addEventListener("click", (event) => {
    if (event.target.id.startsWith("associates")) {
      const idOfButton = event.target.id;
      const [prefix, criminal] = idOfButton.split("--");

      const customEvent = new CustomEvent("associateChosen", {
        detail: {
          chosenCriminal: criminal,
        },
      });
      eventHub.dispatchEvent(customEvent);
    }
  });
};
