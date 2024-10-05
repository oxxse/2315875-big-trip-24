import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import TripInfo from '../view/trip-info';
import { RenderPosition, render, remove } from '../framework/render';
import NoPoints from '../view/no-points';
import Event from './event';
import { sortByTime, sortByDay, sortByPrice, filterBy } from '../utils';
import { FilterType, SortingType, UpdateType, UserAction } from '../const';
import NewEvent from './new-event';

export default class EventsList {
  #eventListComponent = new EventList;
  #infoContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventPresenters = new Map();
  #currentSortType = SortingType.DAY;
  #sorting = null;
  #emptyList = null;
  #filtersModel = null;
  #currentFilter = null;
  #tripInfo = null;
  #tripInfoContainer = null;
  #newEventPresenter = null;

  constructor(infoContainer, eventsModel, destinationsModel, offersModel, filtersModel, tripInfoContainer, onNewPointDestroy) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#tripInfoContainer = tripInfoContainer;
    this.#newEventPresenter = new NewEvent({ eventListContainer: this.#eventListComponent.element, destinationsModel: this.#destinationsModel, offersModel: this.#offersModel, onDataChange: this.#handleViewAction, onDestroy: onNewPointDestroy });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
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

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  createEvent() {
    if (this.#emptyList) {
      remove(this.#emptyList);
    }

    this.#currentSortType = SortingType.DAY;
    this.#currentFilter = FilterType.EVERYTHING;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  #renderPage() {
    if (this.events.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderTripInfo();
      this.#renderSorting();
      this.#renderEventsList();
    }
  }

  #renderNoPoints() {
    this.#emptyList = new NoPoints({ filterType: this.#currentFilter });
    render(this.#emptyList, this.#infoContainer);
  }

  #renderSorting() {
    this.#sorting = new SortingForm({ onSortChange: this.#handleSortChange, currentSorting: this.#currentSortType });
    render(this.#sorting, this.#infoContainer);
  }

  #renderTripInfo() {
    this.#tripInfo = new TripInfo({points: this.events, destinations: this.destinations});
    render(this.#tripInfo, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#infoContainer);
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new Event({
      eventListComponent: this.#eventListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearPage(resetSortingType = false) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sorting);
    remove(this.#tripInfo);

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
    this.#newEventPresenter.destroy();
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
