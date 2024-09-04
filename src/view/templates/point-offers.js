import { offers } from '../mock/mock';
import { createOfferSelector } from './offer-selector';

export function createPointOffers() {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">Add luggage</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">30</span>
            </label>
        </div>
        ${offers.map((offer) => createOfferSelector(offer.title, offer.type, offer.price)).join('')}
      </div>
    </section>`
  );
}
