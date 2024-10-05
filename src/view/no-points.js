import { EmptyText } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createNoPoints(texts) {
  return (
    `<p class="trip-events__msg">
      ${texts[0]}
    </p>`
  );
}

export default class NoPoints extends AbstractView {
  get template() {
    return createNoPoints(EmptyText);
  }
}
