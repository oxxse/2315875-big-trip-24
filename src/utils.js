// import dayjs from 'dayjs';

// const DATE_FORMAT = 'DD/MM/YY HH:mm';

// function getRandomNumber(min = 1, max = 100) {
//   return Math.floor(min + Math.random() * (max + 1 - min));
// }

// function getRandomArrayElement(items) {
//   return items[getRandomNumber(0, items.length - 1)];
// }

// function formatDate(date) {
//   return date ? dayjs(date).format(DATE_FORMAT) : '';
// }

// function calculateDuration(startDate, endDate) {
//   return dayjs(endDate).diff(startDate, 'd');
// }

// export {getRandomArrayElement, getRandomNumber, formatDate, calculateDuration};


import dayjs from 'dayjs';

const DATE_INPUT_FORMAT = 'DD/MM/YY HH:mm';
const POINT_TIME_FORMAT = 'HH:mm';
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}

function formatInputDate(date) {
  return date ? dayjs(date).format(DATE_INPUT_FORMAT) : '';
}

function formatPointDate(date) {
  return date ? dayjs(date).format(POINT_TIME_FORMAT) : '';
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

export {getRandomArrayElement, getRandomNumber, formatInputDate, formatPointDate, calculateDuration};
