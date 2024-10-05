import AbstractView from '../framework/view/abstract-view';
import { formatDate, getDestinationById } from '../utils';
import { DateFormat, MAX_DESTINATIONS } from '../const';

function createTripInfo({ totalPrice, destinationNames, points }) {
  const destinations = Array.from(new Set(destinationNames));

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinations.length > MAX_DESTINATIONS ? `${destinations[0]}&mdash;...&mdash;${destinations[destinations.length - 1]}` : destinations.join(' &mdash; ')}</h1>
        <p class="trip-info__dates">${formatDate(points[0].dateFrom, DateFormat.HEADER_DATE)}&nbsp;&mdash;&nbsp;${formatDate(points[points.length - 1].dateTo, DateFormat.HEADER_DATE)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export default class TripInfo extends AbstractView {
  #points = [];
  #destinations = [];

  constructor({ points, destinations }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfo({ totalPrice: this.#calculateTotalPrice(), destinationNames: this.#getDestinationNames(), points: this.#points });
  }

  #calculateTotalPrice() {
    return this.#points.reduce((total, point) => total + parseInt(point.price, 10), 0);
  }

  #getDestinationNames() {
    return this.#points.map((point) => getDestinationById(point, this.#destinations).name);
  }
}
