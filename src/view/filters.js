import { filterBy } from '../utils';
import AbstractView from '../framework/view/abstract-view';

function createFilterItem(filter, currentFilter) {
  const { type, count } = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${type} ${currentFilter === type ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFilters(filters, currentFilter) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterItem(filter, currentFilter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class Filters extends AbstractView {
  #points = null;
  #currentFilter = null;
  #handleFilterChange = null;

  constructor({ points, currentFilter, onFilterChange }) {
    super();
    this.#points = points;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilters(this.#generateFilters(), this.#currentFilter);
  }

  #generateFilters() {
    return Object.entries(filterBy).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(this.#points).length,
      }),
    );
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();

    this.#handleFilterChange(evt.target.value);
  };
}
