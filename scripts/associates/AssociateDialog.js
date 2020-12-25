export const AssociateDialog = (criminal) => {
  const knownAssociates = criminal.known_associates;
  const dialogTarget = document.querySelector('.criminal-associates');

  dialogTarget.innerHTML = `
  
  <div class="dialog-content">
    <div class="criminal-name"><h3>${criminal.name}'s Known Associates</h3></div>
    <div class="known-associates">
      ${knownAssociates
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((x) => {
          return `
          <p class="known-associates__associate">
            <span class="bold">Associate: </span>${x.name} <span class="bold">- Alibi: </span>${x.alibi} 
          </p>`;
        })
        .join('')}
    </div>
    <div class="button-container">
        <button id="closeModal">Close</button>
    </div>
  </div>
  `;
};
