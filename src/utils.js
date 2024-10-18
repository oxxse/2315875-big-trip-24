import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilterType } from './const';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

const getDuration = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom));

const calculateDuration = (dateFrom, dateTo) => {
  const timeDifference = getDuration(dateFrom, dateTo);
  const timeDuration = dayjs.duration(timeDifference);

  const days = Math.floor(timeDuration.asDays());
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();

  let daysFormat = '';
  let hoursFormat = '';
  let minutesFormat = '';

  if (days) {
    daysFormat = days < 10 ? `0${days}D ` : `${days}D `;
    hoursFormat = '00H ';
    minutesFormat = '00M';
  }

  if (hours) {
    hoursFormat = hours < 10 ? `0${hours}H ` : `${hours}H `;
    minutesFormat = '00M';
  }

  if (minutes) {
    minutesFormat = minutes < 10 ? `0${minutes}M` : `${minutes}M`;
  }

  return daysFormat + hoursFormat + minutesFormat;
};


const getDestinationById = (point, destinations) => destinations.find((destination) => destination.id === point.destination);

const filterBy = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.dateFrom))),
  [FilterType.PRESENT]: (events) => events.filter((event) => dayjs().isSameOrAfter(dayjs(event.dateFrom)) && dayjs().isSameOrBefore(dayjs(event.dateTo))),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.dateTo)))
};

const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

const sortByTime = (pointA, pointB) => {
  const durationPointA = getDuration(pointA.dateFrom, pointA.dateTo);
  const durationPointB = getDuration(pointB.dateFrom, pointB.dateTo);
  return durationPointB - durationPointA;
};

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type);

export { getOffersByType, capitalizeFirstLetter, sortByPrice, sortByTime, sortByDay, filterBy, formatDate, calculateDuration, getDestinationById };
