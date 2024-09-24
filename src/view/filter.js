import { filterBy } from '../utils';
import AbstractView from '../framework/view/abstract-view';

function createFilterItem(filterData, isChecked) {
  const {type, count} = filterData;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${type} ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFilters(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((item, index) => createFilterItem(item, index === 0)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class Filters extends AbstractView {
  #points = [];

  constructor({ points }) {
    super();
    this.#points = points;
  }

  get template() {
    return createFilters(this.#generateFilters());
  }

  #generateFilters() {
    return Object.entries(filterBy).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(this.#points).length,
      }),
    );
  }
}
