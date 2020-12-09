export const Facility = (facility, criminals) => {
  return `<section class="facility-card text-left">
    <p><strong>Facility: </strong>${facility.facilityName}</p>
    <p><strong>Security Level: </strong>${facility.securityLevel}</p>
    <p><strong>Max Capacity: </strong>${facility.capacity} prisoners</p>
    <p><strong>Criminals: </strong></p>
    <ul id="facility--${facility.id}">
      ${criminals.map((c) => `<li> - ${c.name}</li>`).join('')}
    </ul>
  </section>`;
};
