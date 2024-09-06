import { EVENT_TYPES, MAX_OFFERS } from '../const.js';
import { getRandomNumber } from '../utils.js';

const offers = [];

function generateOffer(id) {
  return ({
    id: `${id}`,
    title: 'Upgrade',
    price: getRandomNumber(0, 1000)
  });
}

function generateOffers() {
  for (let i = 0; i < EVENT_TYPES.length; i++) {
    const offer = {};
    offer.type = EVENT_TYPES[i];
    const offersData = [];
    for (let j = 1; j <= MAX_OFFERS; j++) {
      offersData.push(generateOffer(j));
    }
    offer.offersData = offersData;
    offers.push(offer);
  }
  return offers;
}

export {generateOffers};
