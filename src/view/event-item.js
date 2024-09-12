import AbstractView from '../framework/view/abstract-view';
import { createFavoriteButton } from './templates/favorite-button';
import { createOpenButton } from './templates/open-button';
import { formatPointDate, calculateDuration } from '../utils';

function createSelectedOfferItem(offer) {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
  );
}

function createEventItem(point, offersData, destinations) {
  const { price, dateFrom, dateTo, destination, isFavorite, offers, type } = point;
  const destinationItem = destinations.find((place) => place.id === destination);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatPointDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationItem.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatPointDate(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatPointDate(dateTo)}</time>
          </p>
          <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersData.map((offer) => offers.includes(offer.id) ? createSelectedOfferItem(offer) : '').join('')}</ul>
        ${createFavoriteButton(isFavorite)}
        ${createOpenButton()}
      </div>
    </li>`
  );
}

export default class EventItem extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;

  constructor({ point, offers, destinations, onEditClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler)
  }

  get template() {
    return createEventItem(this.#point, this.#offers, this.#destinations);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };
}
