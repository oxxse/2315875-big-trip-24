import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #eventsApiService = null;
  #destinations = [];

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#eventsApiService.destinations;
    return this.#destinations;
  }
}
