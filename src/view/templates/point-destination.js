import { createPhotosTape } from './photos-tape';

export function createPointDestination(destination) {
  const photosContainer = destination.pictures && destination.pictures.length === 0 ? '' : `<div class="event__photos-container">${createPhotosTape(destination.pictures)}</div>`;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${photosContainer}
    </section>`
  );
}
