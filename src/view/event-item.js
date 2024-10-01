import AbstractView from '../framework/view/abstract-view';
import { createFavoriteButton } from './templates/favorite-button';
import { createOpenButton } from './templates/open-button';
import { formatDate, calculateDuration } from '../utils';
import { DateFormat } from '../const';

function createSelectedOfferItem(offer) {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
  );
}

function createEventItem(point, offersByType, destinations) {

  const { price, dateFrom, dateTo, destination, isFavorite, offers, type } = point;
  const destinationItem = destinations.find((place) => place.id === destination);
  const offersData = offersByType.find((offer) => offer.type === type);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDate(dateFrom, DateFormat.POINT_ATTRIBUTE)}">${formatDate(dateFrom, DateFormat.POINT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationItem.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(dateFrom, DateFormat.FULL_POINT_ATTRIBUTE)}">${formatDate(dateFrom, DateFormat.POINT_TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(dateTo, DateFormat.FULL_POINT_ATTRIBUTE)}">${formatDate(dateTo, DateFormat.POINT_TIME)}</time>
          </p>
          <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersData.offersData.map((offer) => offers.includes(offer.id) ? createSelectedOfferItem(offer) : '').join('')}</ul>
        ${createFavoriteButton(isFavorite)}
        ${createOpenButton()}
      </div>
    </li>`
  );
}

export default class EventItem extends AbstractView {
  #event = [];
  #offers = [];
  #destinations = [];
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ event, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventItem(this.#event, this.#offers, this.#destinations);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
