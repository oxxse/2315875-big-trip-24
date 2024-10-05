import { getDestinationList } from '../mock/destination.js';

export default class DestinationsModel {
  #destinations = getDestinationList();

  get destinations() {
    return this.#destinations;
  }
}
