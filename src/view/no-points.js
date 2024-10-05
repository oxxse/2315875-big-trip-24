import { EmptyText } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createNoPoints(filterType) {
  return (
    `<p class="trip-events__msg">
      ${EmptyText[filterType]}
    </p>`
  );
}

export default class NoPoints extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPoints(this.#filterType);
  }
}
