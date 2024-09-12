import TripInfo from '../view/trip-info';
import Filters from '../view/filter';
import NewEventButton from '../view/new-event-button';
import { render, RenderPosition } from '../framework/render';

export default class Header {
  #infoContainer = null;
  #filterContainer = null;
  #buttonContainer = null;

  constructor(infoContainer, filterContainer, buttonContainer) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
    this.#buttonContainer = buttonContainer;
  }

  init() {
    render(new TripInfo(), this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(new Filters(), this.#filterContainer);
    render(new NewEventButton(), this.#buttonContainer);
  }
}
