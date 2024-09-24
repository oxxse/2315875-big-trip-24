
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];

const DateFormat = {
  DATE_INPUT: 'DD/MM/YY HH:mm',
  POINT_TIME: 'HH:mm',
  POINT_DATE: 'MMM DD'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SORTING_TYPES = ['day', 'event', 'time', 'price', 'offer'];

const EMPTY_TEXTS = [ 'Click New Event to create your first point', 'There are no past events now', 'There are no present events now', 'There are no future events now'];

const MAX_OFFERS = 4;

export {
  EMPTY_TEXTS,
  SORTING_TYPES,
  FilterType,
  DESTINATIONS,
  EVENT_TYPES,
  MAX_OFFERS,
  DateFormat,
  Mode
};
