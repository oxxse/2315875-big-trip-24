
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_TYPE = 'flight';
const DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];

const DateFormat = {
  DATE_INPUT: 'DD/MM/YY HH:mm',
  POINT_TIME: 'HH:mm',
  POINT_DATE: 'MMM DD',
  POINT_ATTRIBUTE: 'YYYY-MM-DD',
  FULL_POINT_ATTRIBUTE: 'YYYY-MM-DD[T]HH:mm'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  VIEWING: 'VIEWING',
  EDITING: 'EDITING'
};

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const EMPTY_TEXTS = [ 'Click New Event to create your first point', 'There are no past events now', 'There are no present events now', 'There are no future events now'];

const MAX_OFFERS = 4;

const BlankPoint = {
  id: '',
  price: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

export {
  EMPTY_TEXTS,
  SortingType,
  FilterType,
  DESTINATIONS,
  EVENT_TYPES,
  MAX_OFFERS,
  DateFormat,
  Mode,
  BlankPoint
};
