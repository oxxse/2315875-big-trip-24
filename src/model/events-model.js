import { getEvents } from '../mock/event.js';
import { generateOffers } from '../mock/offer.js';
import { getDestinationList } from '../mock/destination.js';

export default class EventsModel {
  #offers = generateOffers();
  offers2 = generateOffers();
  #events = getEvents();
  #destinations = getDestinationList();

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
