import dayjs from 'dayjs';
import { FilterType } from './const';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

function calculateDuration(startDate, endDate) {
  const timeDuration = dayjs(endDate).diff(startDate);
  let timeFormat = 'DD[D] HH[H] mm[M]';
  if (timeDuration < MILLISECONDS_IN_DAY) {
    timeFormat = 'HH[H] mm[M]';
  }
  if (timeDuration < MILLISECONDS_IN_HOUR) {
    timeFormat = 'mm[M]';
  }
  return dayjs(timeDuration).format(timeFormat);
}

const filterBy = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.dateFrom))),
  [FilterType.PRESENT]: (events) => events.filter((event) => dayjs().isSameOrAfter(dayjs(event.dateFrom)) && dayjs().isSameOrBefore(dayjs(event.dateTo))),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.dateTo)))
};

function updateItem(items, newItem) {
  return items.map((item) => item.id === newItem.id ? newItem : item);
}

const getDuration = ({ dateFrom, dateTo }) => dayjs(dateTo).diff(dayjs(dateFrom));

const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

const sortByTime = (pointA, pointB) => {
  const durrationPointA = getDuration(pointA.dateFrom, pointA.dateTo);
  const durrationPointB = getDuration(pointB.dateFrom, pointB.dateTo);
  return durrationPointB - durrationPointA;
};


const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);

export { getRandomArrayElement, updateItem, sortByPrice, sortByTime, sortByDay, filterBy, getRandomNumber, formatDate, calculateDuration };
