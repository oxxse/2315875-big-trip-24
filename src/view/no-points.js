import { createElement } from '../render';
import { EMPTY_TEXTS } from '../const';

function createNoPoints(texts) {
  return (
    `<p class="trip-events__msg">
      ${texts[0]}
    </p>`
  );
}

export default class NoPoints {
  getTemplate() {
    return createNoPoints(EMPTY_TEXTS);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
