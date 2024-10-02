import { SortingType } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createSortingItem(sorting, currentSorting) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sorting}">
      <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}" data-sort-type="${sorting}" ${sorting === currentSorting ? 'checked' : ''} ${sorting === SortingType.EVENT || sorting === SortingType.OFFER ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sorting}">${sorting === SortingType.OFFER ? 'Offers' : sorting}</label>
    </div>`
  );
}

function createSortingForm(sortings, currentSorting) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortings.map((sorting) => createSortingItem(sorting, currentSorting)).join('')}
   </form>`
  );
}

export default class SortingForm extends AbstractView {
  #handleSortClick = null;
  #currentSorting = null;

  constructor({ onSortChange, currentSorting }) {
    super();
    this.#handleSortClick = onSortChange;
    this.#currentSorting = currentSorting;

    this.element.addEventListener('change', this.#sortClickHandler);
  }

  get template() {
    return createSortingForm(Object.values(SortingType), this.#currentSorting);
  }

  #sortClickHandler = (evt) => {
    if (!evt.target.matches('input[name="trip-sort"]')) {
      return;
    }
    this.#handleSortClick(evt.target.dataset.sortType);
  };
}
