import AbstractView from '../framework/view/abstract-view';

function createLoadingError() {
  return (
    `<p class="trip-events__msg">
      Failed to load latest route information
    </p>`
  );
}

export default class LoadingError extends AbstractView {
  get template() {
    return createLoadingError();
  }
}
