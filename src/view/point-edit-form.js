import { createEventTypeList } from './templates/event-type-list.js';
import { createDestinationForm } from './templates/destination-form.js';
import { createPointOffers } from './templates/point-offers.js';
import { createPointDestination } from './templates/point-destination.js';
import { createOpenButton } from './templates/open-button.js';
import { formatDate } from '../utils.js';
import { DateFormat, BLANK_POINT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';

function createPointEditForm(state, allOffers, destinations, isEdit) {

  const { price, dateFrom, dateTo, destination, offers, type, isDisabled, isSaving, isDeleting } = state;
  const offersByType = allOffers.find((offer) => offer.type === type);
  const destinationItem = destinations.find((place) => place.id === destination);
  const numberPattern = '/d+';

  const deleteButtonName = () => {
    if (isEdit && isDeleting) {
      return 'Deleting...';
    }

    if (isEdit && !isDeleting) {
      return 'Delete';
    }

    if (!isEdit && !isDeleting) {
      return 'Cancel';
    }
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" ${isDisabled ? 'disabled' : ''}  type="checkbox">
            <div class="event__type-list">
              ${createEventTypeList(type)}
            </div>
          </div>

          ${createDestinationForm(type, destinationItem, destinations, isDisabled)}

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.DATE_INPUT)}" ${isDisabled ? 'disabled' : ''}  required>
              &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.DATE_INPUT)}" ${isDisabled ? 'disabled' : ''}  required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" min="1" pattern=${numberPattern} ${isDisabled ? 'disabled' : ''} required>
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSaving ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDeleting ? 'disabled' : ''}>${deleteButtonName()}</button>
          ${isEdit ? createOpenButton() : ''}
        </header>
        <section class="event__details">
          ${offersByType.offers.length === 0 ? '' : createPointOffers(offersByType, offers, isDisabled)}
          ${destinationItem && destinationItem.description ? createPointDestination(destinationItem) : ''}
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
  #handleEventDelete = null;
  #destination = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ event = BLANK_POINT, offers, destinations, isEdit, onFormSubmit, onFormReset, onDeleteClick }) {
    super();
    this.#initialEvent = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#isEdit = isEdit;
    this.#handleFormReset = onFormReset;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEventDelete = onDeleteClick;

    if (isEdit) {
      this.#destination = destinations.find((place) => place.id === event.destination);
      this._setState(PointEditForm.parsePointToState(event, this.#destination.id));
    } else {
      this._setState(PointEditForm.parsePointToState(event, event.destination));
    }

    this._restoreHandlers();

  }

  get template() {
    return createPointEditForm(this._state, this.#offers, this.#destinations, this.#isEdit);
  }

  reset() {
    this.element.querySelectorAll('.event__input').forEach((input) => input.blur());
    this.updateElement({
      ...this.#initialEvent
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteEventHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerSelectHandler);

    if (this.#isEdit) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formResetHandler);
    }

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditForm.parseStateToPoint(this._state));
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset(PointEditForm.parseStateToPoint(this.#initialEvent));
  };

  #deleteEventHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventDelete(PointEditForm.parseStateToPoint(this.#initialEvent));
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
      destination: newDestination ? newDestination.id : ''
    });
  };


  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      price: parseInt(newPrice, 10)
    });
  };

  #offerSelectHandler = () => {
    const checkedOffersElement = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const checkedOffersById = Array.from(checkedOffersElement).map((item) => item.dataset.offerId);
    this._setState({
      offers: checkedOffersById
    });
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormat.SET_DATE,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormat.SET_DATE,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom
      }
    );
  }

  static parsePointToState(event, destination) {
    return {
      ...event,
      destination: destination,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

}
