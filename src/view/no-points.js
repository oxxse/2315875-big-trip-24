import { createElement } from '../render';
import { emptyTexts } from '../const';

function createNoPoints(texts) {
  return (
    `<p class="trip-events__msg">
      ${texts[0]}
    </p>`
  );
}

export default class NpPoints {
  getTemplate() {
    return createNoPoints(emptyTexts);
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
