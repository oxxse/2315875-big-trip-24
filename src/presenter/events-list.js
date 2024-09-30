import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import { render } from '../framework/render';
import NoPoints from '../view/no-points';
import Event from './event';
import { updateItem, sortByTime, sortByDay, sortByPrice } from '../utils';
import { SortingType } from '../const';

export default class EventsList {
  #eventListComponent = new EventList;
  #infoContainer = null;
  #eventsModel = null;
  #eventPresenters = new Map();
  #currentSortType = SortingType.DAY;
  #destinationsList = [];
  #offersList = [];
  #eventsList = [];

  constructor(infoContainer, eventsModel) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#eventsList = [...this.#eventsModel.events].sort(sortByDay);
    this.#offersList = [...this.#eventsModel.offers];
    this.#destinationsList = [...this.#eventsModel.destinations];

    if (this.#eventsList.length === 0) {
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
    render(new SortingForm({ onSortChange: this.#handleSortChange, currentSorting: this.#currentSortType }), this.#infoContainer);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#infoContainer);
    this.#eventsList.forEach((event) => this.#renderEvent(event));
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
  }

  #renderEvent(event) {
    const eventPresenter = new Event({
      eventListComponent: this.#eventListComponent.element,
      offers: this.#offersList,
      destinations: this.#destinationsList,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #sortEvents(sortingType) {
    switch (sortingType) {
      case SortingType.TIME: this.#eventsList.sort(sortByTime);
        break;
      case SortingType.PRICE: this.#eventsList.sort(sortByPrice);
        break;
      default: this.#eventsList.sort(sortByDay);
    }
  }

  #handlePointChange = (updatedEvent) => {
    this.eventsList = updateItem(this.#eventsList, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetFormView());
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#sortEvents(this.#currentSortType);
    this.#clearEventsList();
    this.#renderEventsList();
  };
}
