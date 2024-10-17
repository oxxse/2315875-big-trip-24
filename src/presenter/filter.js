import { UpdateType } from '../const';
import { remove, render } from '../framework/render';
import Filters from '../view/filters';

export default class Filter {
  #eventsModel = null;
  #filtersModel = null;
  #filtersContainer = null;
  #filtersComponent = null;

  constructor(filtersContainer, eventsModel, filtersModel) {
    this.#eventsModel = eventsModel;
    this.#filtersContainer = filtersContainer;
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
    if (this.#filtersComponent) {
      remove(this.#filtersComponent);
    }

    this.#filtersComponent = new Filters({points: this.events, currentFilter: this.#filtersModel.filter, onFilterChange: this.#handleFilterChange});
    render(this.#filtersComponent, this.#filtersContainer);
  }

  #handleFilterChange = (filterType) => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleEventsChange = () => {
    this.#renderFilters();
  };
}
