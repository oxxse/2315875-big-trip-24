import TripInfo from '../view/trip-info';
import Filters from '../view/filter';
import NewEventButton from '../view/new-event-button';
import { render, RenderPosition } from '../framework/render';

export default class Header {
  #infoContainer = null;
  #filterContainer = null;
  #buttonContainer = null;
  #eventsModel = null;
  #destinationsModel = null;

  constructor(infoContainer, filterContainer, buttonContainer, eventsModel, destinationsModel) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
    this.#buttonContainer = buttonContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.destinationsList = [...this.#destinationsModel.destinations];

    render(new TripInfo({points: this.eventsList, destinations: this.#getCheckedDestinations()}), this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(new Filters({points: this.eventsList }), this.#filterContainer);
    render(new NewEventButton(), this.#buttonContainer);
  }

  #getCheckedDestinations() {
    const destinationsIds = this.eventsList.map((event) => event.destination);
    return this.destinationsList.filter((destination) => destinationsIds.includes(destination.id));
  }
}
