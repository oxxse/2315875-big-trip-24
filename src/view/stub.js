import { EmptyText } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createStub(filterType) {
  return (
    `<p class="trip-events__msg">
      ${EmptyText[filterType]}
    </p>`
  );
}

export default class Stub extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createStub(this.#filterType);
  }
}
