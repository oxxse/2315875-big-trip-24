import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import { render, remove } from '../framework/render';
import NoPoints from '../view/no-points';
import Event from './event';
import { sortByTime, sortByDay, sortByPrice, filterBy } from '../utils';
import { SortingType, UpdateType, UserAction } from '../const';

export default class EventsList {
  #eventListComponent = new EventList;
  #infoContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventPresenters = new Map();
  #currentSortType = SortingType.DAY;
  #destinationsList = [];
  #offersList = [];
  #sorting = null;
  #emptyList = null;
  #filtersModel = null;
  #currentFilter = null;

  constructor(infoContainer, eventsModel, destinationsModel, offersModel, filtersModel) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#offersList = [...this.#offersModel.offers];
    this.#destinationsList = [...this.#destinationsModel.destinations];
    this.#currentFilter = [...this.#filtersModel.filter];

    this.#renderPage();
  }

  get events() {
    this.#currentFilter = this.#filtersModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filterBy[this.#currentFilter](events);

    switch (this.#currentSortType) {
      case SortingType.TIME:
        filteredEvents.sort(sortByTime);
        break;
      case SortingType.PRICE:
        filteredEvents.sort(sortByPrice);
        break;
      default: filteredEvents.sort(sortByDay);
    }

    return filteredEvents;
  }


  #renderPage() {
    if (this.events.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSorting();
      this.#renderEventsList();
    }
  }

  #renderNoPoints() {
    this.#emptyList = new NoPoints({filterType: this.#currentFilter});
    render(this.#emptyList, this.#infoContainer);
  }

  #renderSorting() {
    this.#sorting = new SortingForm({ onSortChange: this.#handleSortChange, currentSorting: this.#currentSortType });
    render(this.#sorting, this.#infoContainer);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#infoContainer);
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new Event({
      eventListComponent: this.#eventListComponent.element,
      offers: this.#offersList,
      destinations: this.#destinationsList,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearPage(resetSortingType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sorting);

    if (this.#emptyList) {
      remove(this.#emptyList);
    }

    if (resetSortingType) {
      this.#currentSortType = SortingType.DAY;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetFormView());
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPage();
    this.#renderPage();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderPage();
        break;
      case UpdateType.MAJOR:
        this.#clearPage({ resetSortingType: true });
        this.#renderPage();
        break;
    }
  };
}
