function createDestinationOption(city) {
  return (
    `<option value=${city}></option>`
  );
}

export function createDestinationForm(type, destination, destinations) {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1" required>
        <datalist id="destination-list-1">
        ${destinations.map((city) => createDestinationOption(city.name)).join('')}
        </datalist>
    </div>`
  );
}
