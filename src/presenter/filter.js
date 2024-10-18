import { UpdateType } from '../const';
import { remove, render } from '../framework/render';
import Filters from '../view/filters';

export default class Filter {
  #eventsModel = null;
  #filtersModel = null;
  #filtersContainerElement = null;
  #filtersElement = null;

  constructor(filtersContainerElement, eventsModel, filtersModel) {
    this.#eventsModel = eventsModel;
    this.#filtersContainerElement = filtersContainerElement;
    this.#filtersModel = filtersModel;

    this.#eventsModel.addObserver(this.#handleEventsChange);
    this.#filtersModel.addObserver(this.#handleEventsChange);
  }

  get events() {
    return this.#eventsModel.events;
  }

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    if (this.#filtersElement) {
      remove(this.#filtersElement);
    }

    this.#filtersElement = new Filters({points: this.events, currentFilter: this.#filtersModel.filter, onFilterChange: this.#handleFilterChange});
    render(this.#filtersElement, this.#filtersContainerElement);
  }

  #handleFilterChange = (filterType) => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleEventsChange = () => {
    this.#renderFilters();
  };
}
