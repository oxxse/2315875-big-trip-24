import AbstractView from '../framework/view/abstract-view';

function createError() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

export default class Error extends AbstractView {
  get template() {
    return createError();
  }
}
