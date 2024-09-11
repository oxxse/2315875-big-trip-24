import { SORTING_TYPES } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createSortingItem(sorting) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sorting}">
      <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}" checked>
      <label class="trip-sort__btn" for="sort-${sorting}">${sorting}</label>
    </div>`
  );
}

function createSortingForm(sortings) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortings.map((sorting) => createSortingItem(sorting)).join('')}
   </form>`
  );
}

export default class SortingForm extends AbstractView {
  get template() {
    return createSortingForm(SORTING_TYPES);
  }
}
