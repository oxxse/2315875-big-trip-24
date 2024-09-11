import { FILTER_TYPES } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createFilterItem(filter) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filter} checked>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`
  );
}

function createFilters(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterItem(filter)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class Filters extends AbstractView {
  get template() {
    return createFilters(FILTER_TYPES);
  }
}
