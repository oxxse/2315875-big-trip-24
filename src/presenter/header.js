import TripInfo from '../view/trip-info';
import Filters from '../view/filter';
import { render, RenderPosition } from '../framework/render';

export default class Header {
  #infoContainer = null;
  #filterContainer = null;

  constructor(infoContainer, filterContainer) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
  }

  init() {
    render(new TripInfo(), this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(new Filters(), this.#filterContainer);
  }
}
