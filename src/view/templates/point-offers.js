import { createOfferSelector } from './offer-selector';

export function createPointOffers(offersByType, pointOffers, isDisabled) {

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersByType.offers.map((offer) => createOfferSelector(offer.title, offer.type, offer.price, pointOffers, offer.id, isDisabled)).join('')}
      </div>
    </section>`
  );
}
