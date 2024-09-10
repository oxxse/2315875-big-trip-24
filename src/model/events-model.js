import { getRandomEvent } from '../mock/event.js';
import { generateOffers } from '../mock/offer.js';
import { getDestinationList } from '../mock/destination.js';

const EVENTS_COUNT = 4;

export default class EventsModel {
  offers = generateOffers();
  events = Array.from({length: EVENTS_COUNT}, getRandomEvent);
  destinations = getDestinationList();

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
