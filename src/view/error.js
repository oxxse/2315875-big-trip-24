import AbstractView from '../framework/view/abstract-view';

function createError() {
  return (
    `<p class="trip-events__msg">
      Failed to load latest route information
    </p>`
  );
}

export default class Error extends AbstractView {
  get template() {
    return createError();
  }
}
