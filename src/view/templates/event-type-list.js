import { EVENT_TYPES } from '../../const';
import { capitalizeFirstLetter } from '../../utils';

function createEventTypeItem(event, type) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}" ${event === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">${capitalizeFirstLetter(event)}</label>
    </div>`
  );
}

export function createEventTypeList(type) {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${EVENT_TYPES.map((event) => createEventTypeItem(event, type)).join('')}
    </fieldset>`
  );
}
