import { generateOffers } from '../mock/offer.js';

export default class OffersModel {
  #offers = generateOffers();

  get offers() {
    return this.#offers;
  }
}
