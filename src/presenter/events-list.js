import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import { render } from '../framework/render';
import NoPoints from '../view/no-points';
import Event from './event';
import { updateItem } from '../utils';

export default class EventsList {
  #eventListComponent = new EventList;
  #infoContainer = null;
  #eventsModel = null;
  #eventPresenters = new Map();

  constructor(infoContainer, eventsModel) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.offersList = [...this.#eventsModel.offers];
    this.destinationsList = [...this.#eventsModel.destinations];

    if (this.eventsList.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSorting();
      this.#renderEventsList();
    }
  }

  #renderNoPoints() {
    render(new NoPoints(), this.#infoContainer);
  }

  #renderSorting() {
    render(new SortingForm(), this.#infoContainer);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#infoContainer);
    for (let i = 0; i < this.eventsList.length; i++) {
      this.#renderEvent(this.eventsList[i]);
    }
  }

  #renderEvent(event) {
    const eventPresenter = new Event({
      eventListComponent: this.#eventListComponent.element,
      offers: this.offersList,
      destinations: this.destinationsList,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #handlePointChange = (updatedEvent) => {
    this.eventsList = updateItem(this.eventsList, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetFormView());
  };
}
