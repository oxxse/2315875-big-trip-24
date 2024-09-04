function createEventTypeItem(type) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
}

export function createEventTypeList(events) {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${events.map((event) => createEventTypeItem(event))}
    </fieldset>`
  );
}
