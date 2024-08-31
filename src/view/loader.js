import { createElement } from '../render';

function createError() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

export default class Error {
  getTemplate() {
    return createError();
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
