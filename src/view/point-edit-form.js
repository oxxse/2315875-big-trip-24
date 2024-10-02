import { createEventTypeList } from './templates/event-type-list.js';
import { createDestinationForm } from './templates/destination-form.js';
import { createPointOffers } from './templates/point-offers.js';
import { createPointDestination } from './templates/point-destination.js';
import { createOpenButton } from './templates/open-button.js';
import { formatDate } from '../utils.js';
import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createPointEditForm(point, allOffers, destinations, isEdit) {
  const { price, dateFrom, dateTo, destination, offers, type } = point;
  const pointOffers = allOffers.find((offer) => offer.type === type);
  const destinationItem = destinations.find((place) => place.id === destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              ${createEventTypeList(type)}
            </div>
          </div>

          ${createDestinationForm(type, destinationItem, destinations)}

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.DATE_INPUT)}">
              &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.DATE_INPUT)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isEdit ? 'Delete' : 'Cancel'}</button>
          ${isEdit ? createOpenButton() : ''}
        </header>
        <section class="event__details">
          ${offers.length === 0 ? '' : createPointOffers(pointOffers, offers)}
          ${destinationItem.description ? createPointDestination(destinationItem) : ''}
        </section>
      </form>
    </li>`
  );
}

export default class PointEditForm extends AbstractStatefulView {
  #initialEvent = [];
  #offers = [];
  #destinations = [];
  #isEdit = null;
  #handleFormSubmit = null;
  #handleFormReset = null;
  #destination = null;

  constructor({ event = BlankPoint, offers, destinations, isEdit, onFormSubmit, onFormReset }) {
    super();
    this.#initialEvent = event;
    this.#destination = destinations.find((place) => place.id === event.destination);
    this._setState(PointEditForm.parsePointToState(event, this.#destination.id));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#isEdit = isEdit;
    this.#formResetHandler = onFormReset;
    this.#formSubmitHandler = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditForm(this._state, this.#offers, this.#destinations, this.#isEdit);
  }

  reset() {
    this.updateElement({
      ...this.#initialEvent
    });
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('form').addEventListener('reset', this.#formResetHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formResetHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditForm.parseStateToPoint(this.#initialEvent));
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset(PointEditForm.parseStateToPoint(this.#initialEvent));
  };


  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    this.updateElement({
      type: targetType,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#destinations.find((item) => item.name === targetDestination);
    this.updateElement({
      destination: newDestination.id
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      price: newPrice
    });
  };

  static parsePointToState(event, destination) {
    return {
      ...event,
      destination: destination,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    return point;
  }

}
