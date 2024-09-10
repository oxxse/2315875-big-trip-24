import { DESTINATIONS } from '../../const';

function createDestinationOption(city) {
  return (
    `<option value=${city}></option>`
  );
}

export function createDestinationForm(type, destination) {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${DESTINATIONS.map((city) => createDestinationOption(city)).join('')}
        </datalist>
    </div>`
  );
}
