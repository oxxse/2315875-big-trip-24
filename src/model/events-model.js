import { getRandomEvent } from '../mock/event.js';
import { generateOffers } from '../mock/offer.js';
import { getDestinationList } from '../mock/destination.js';

const EVENTS_COUNT = 4;

export default class EventsModel {
  #offers = generateOffers();
  offers2 = generateOffers();
  #events = Array.from({length: EVENTS_COUNT}, getRandomEvent);
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
