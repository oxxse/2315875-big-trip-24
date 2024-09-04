function createDestinationOption(city) {
  return (
    `<option value=${city}></option>`
  );
}

export function createDestinationForm(cities) {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
        <datalist id="destination-list-1">
        ${cities.map((city) => createDestinationOption(city))}
        </datalist>
    </div>`
  );
}
