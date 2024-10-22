import AbstractView from '../framework/view/abstract-view';

function createNewEventButton() {
  return ('<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>');
}

export default class NewEventButton extends AbstractView {
  #handleButtonClick = null;

  constructor({onButtonClick}) {
    super();
    this.#handleButtonClick = onButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createNewEventButton();
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
