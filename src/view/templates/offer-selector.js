export function createOfferSelector(title, type, price, pointOffers, id, isDisabled) {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" data-offer-id="${id}" ${isDisabled ? 'disabled' : ''}  ${pointOffers.includes(id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${type}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
    </div>`
  );
}
