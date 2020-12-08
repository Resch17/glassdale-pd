import { Witness } from './Witness.js';
import { useWitnesses, getWitnesses } from './WitnessProvider.js';

const eventHub = document.querySelector('.container');
const witnessTarget = document.querySelector('.criminalsContainer');
const showCriminalsButton = document.querySelector('#showCriminals');
const showWitnessesButton = document.querySelector('#showWitnesses');
const filters = document.querySelector('.filters');

const render = (witnessCollection) => {
  witnessTarget.innerHTML = witnessCollection
    .map((witness) => Witness(witness))
    .join('');
};

export const witnessList = () => {
  eventHub.addEventListener('click', (clickEvent) => {
    if (clickEvent.target.id === 'showWitnesses') {
      witnessTarget.innerHTML = '';
      getWitnesses().then(() => {
        let witnesses = useWitnesses();
        render(witnesses);
      });
      showCriminalsButton.classList.remove('isHidden');
      filters.classList.add('isHidden');
      clickEvent.target.classList.add('isHidden');
      showCriminalsButton.style.marginTop = '1em';
    } else if (clickEvent.target.id === 'showCriminals') {
      const customEvent = new CustomEvent('showCriminals');
      eventHub.dispatchEvent(customEvent);
      showWitnessesButton.classList.remove('isHidden');
      clickEvent.target.classList.add('isHidden');
      filters.classList.remove('isHidden');
    }
  });
};
