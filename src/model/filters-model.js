import { FilterType } from '../const';
import Observable from '../framework/observable';

export default class FiltersModel extends Observable {
  #currentFilter = FilterType.EVERYTHING;

  get filter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
