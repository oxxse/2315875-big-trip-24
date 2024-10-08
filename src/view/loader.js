import AbstractView from '../framework/view/abstract-view';

function createLoader() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

export default class Error extends AbstractView {
  get template() {
    return createLoader();
  }
}
