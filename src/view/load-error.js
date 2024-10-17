import AbstractView from '../framework/view/abstract-view';

function createLoadError() {
  return (
    `<p class="trip-events__msg">
      Failed to load latest route information
    </p>`
  );
}

export default class LoadError extends AbstractView {
  get template() {
    return createLoadError();
  }
}
