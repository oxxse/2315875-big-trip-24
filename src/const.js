
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_TYPE = 'flight';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

const DateFormat = {
  DATE_INPUT: 'DD/MM/YY HH:mm',
  SET_DATE: 'd/m/y H:i',
  POINT_TIME: 'HH:mm',
  POINT_DATE: 'MMM DD',
  HEADER_DATE: 'DD MMM',
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

const EmptyText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
  LOADING: 'Loading...',
  LOADING_ERROR: 'Failed to load latest route information'
};

const MAX_DESTINATIONS = 3;

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const BLANK_POINT = {
  price: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const AUTHORIZATION = 'Basic of23Pdd5dPd0s213dAvsa12d';

const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

export {
  EmptyText,
  SortingType,
  FilterType,
  EVENT_TYPES,
  DateFormat,
  Mode,
  BLANK_POINT,
  UserAction,
  UpdateType,
  MAX_DESTINATIONS,
  DEFAULT_TYPE,
  Method,
  AUTHORIZATION,
  END_POINT,
  TimeLimit
};
