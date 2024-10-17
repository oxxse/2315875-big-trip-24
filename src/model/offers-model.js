import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #eventsApiService = null;
  #offers = [];

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#eventsApiService.offers;
    return this.#offers;
  }
}
