import AbstractView from '../framework/view/abstract-view';
import { createFavoriteButton } from './templates/favorite-button';
import { createOpenButton } from './templates/open-button';
import { formatDate, calculateDuration, getOffersByType, getDestinationById } from '../utils';
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

function createEventItem(event, offersData, destinations) {
  const { price, dateFrom, dateTo, isFavorite, offers, type } = event;
  const destinationItem = getDestinationById(event, destinations);
  const offersByType = getOffersByType(offersData, type);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDate(dateFrom, DateFormat.POINT_ATTRIBUTE)}">${formatDate(dateFrom, DateFormat.POINT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationItem ? destinationItem.name : ''}</h3>
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
        ${offersByType.offers.map((offer) => offers.includes(offer.id) ? createSelectedOfferItem(offer) : '').join('')}</ul>
        ${createFavoriteButton(isFavorite)}
        ${createOpenButton()}
      </div>
    </li>`
  );
}

export default class EventItem extends AbstractView {
  #event = null;
  #offersData = [];
  #destinations = [];
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ event, offersData, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#offersData = offersData;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventItem(this.#event, this.#offersData, this.#destinations);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
