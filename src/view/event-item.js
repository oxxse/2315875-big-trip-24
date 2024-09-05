import { createElement } from '../render';
import { createFavoriteButton } from './templates/favorite-button';
import { createOpenButton } from './templates/open-button';
import { formatDate, calculateDuration } from '../utils';

function createSelectedOfferItem(offer) {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
  );
}

function createEventItem(point, offersData) {
  const { price, dateFrom, dateTo, destination, isFavorite, offers, type } = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatDate(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatDate(dateTo)}</time>
          </p>
          <p class="event__duration">${calculateDuration(dateFrom, dateTo)}D</p>
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

export default class EventItem {
  constructor({ point, offers }) {
    this.point = point;
    this.offers = offers;
  }

  getTemplate() {
    return createEventItem(this.point, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
