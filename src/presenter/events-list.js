import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import TripInfo from '../view/trip-info';
import Stub from '../view/stub';
import { RenderPosition, render, remove } from '../framework/render';
import Event from './event';
import { sortByTime, sortByDay, sortByPrice, filterBy } from '../utils';
import { EmptyText, FilterType, SortingType, TimeLimit, UpdateType, UserAction } from '../const';
import NewEvent from './new-event';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export default class EventsList {
  #eventListComponent = new EventList;
  #infoContainerElementElement = null;
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
  #tripInfoContainerElement = null;
  #newEventPresenter = null;
  #loader = null;
  #isLoading = true;
  #loadingError = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(infoContainerElement, eventsModel, destinationsModel, offersModel, filtersModel, tripInfoContainerElement, onNewPointDestroy) {
    this.#infoContainerElementElement = infoContainerElement;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#tripInfoContainerElement = tripInfoContainerElement;
    this.#newEventPresenter = new NewEvent({ eventListContainer: this.#eventListComponent.element, destinationsModel: this.#destinationsModel, offersModel: this.#offersModel, onDataChange: this.#handleViewAction, onDestroy: onNewPointDestroy, onReset: this.#handleFormReset });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
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

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get error() {
    return this.#eventsModel.error;
  }

  init() {
    this.#renderPage();
  }

  createEvent() {
    this.#currentSortType = SortingType.DAY;
    this.#currentFilter = FilterType.EVERYTHING;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    remove(this.#emptyList);
    this.#newEventPresenter.init();
  }

  #renderPage() {
    if (this.error) {
      this.#renderError();
      return;
    }

    if (this.#isLoading) {
      this.#renderLoader();
      return;
    }

    if (this.events.length > 0) {
      this.#renderSorting();
      this.#renderTripInfo();
    }

    if (this.events.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderEventsList();
  }

  #renderLoader() {
    const loadingText = Object.keys(EmptyText).find((item) => item === 'LOADING');
    this.#loader = new Stub({ filterType: loadingText });
    render(this.#loader, this.#infoContainerElementElement, RenderPosition.BEFOREEND);
  }

  #renderError() {
    const loadingErrorText = Object.keys(EmptyText).find((item) => item === 'LOADING_ERROR');
    this.#loadingError = new Stub({ filterType: loadingErrorText });
    render(this.#loadingError, this.#infoContainerElementElement, RenderPosition.BEFOREEND);
  }

  #renderNoPoints() {
    this.#emptyList = new Stub({ filterType: this.#currentFilter });
    render(this.#emptyList, this.#infoContainerElementElement, RenderPosition.BEFOREEND);
  }

  #renderSorting() {
    this.#sorting = new SortingForm({ onSortChange: this.#handleSortChange, currentSorting: this.#currentSortType });
    render(this.#sorting, this.#infoContainerElementElement, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo() {
    this.#tripInfo = new TripInfo({ defaultPoints: this.#eventsModel.events.sort(sortByDay), destinations: this.destinations, offers: this.offers});
    render(this.#tripInfo, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#infoContainerElementElement);
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new Event({
      eventListElement: this.#eventListComponent.element,
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
    remove(this.#loader);
    remove(this.#emptyList);

    if (resetSortingType) {
      this.#currentSortType = SortingType.DAY;
    }

    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch (error) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch (error) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch (error) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleFormReset = () => {
    if (this.events.length === 0) {
      remove(this.#sorting);
      this.#renderNoPoints();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loader);
        this.#renderPage();
        break;
    }
  };
}
