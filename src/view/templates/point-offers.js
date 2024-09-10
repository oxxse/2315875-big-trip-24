import { createOfferSelector } from './offer-selector';

export function createPointOffers(pointOffers, offers) {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${pointOffers.offersData.map((offer) => createOfferSelector(offer.title, offer.type, offer.price, offers, offer.id)).join('')}
      </div>
    </section>`
  );
}
