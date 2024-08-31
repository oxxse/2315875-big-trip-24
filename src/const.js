
const eventTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];
const offers = [{
  title: 'Add luggage',
  type: 'luggage',
  price: 50
},
{
  title: 'Switch to comfort',
  type: 'comfort',
  price: 80
},
{
  title: 'Add meal',
  type: 'meal',
  price: 15
},
{
  title: 'Choose seats',
  type: 'seats',
  price: 5
},
{
  title: 'Travel by train',
  type: 'train',
  price: 40
}
];

const photos = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];

const filterTypes = ['everyting', 'future', 'present', 'past'];

const sortingTypes = ['day', 'event', 'time', 'price', 'offer'];

const emptyTexts = [ 'Click New Event to create your first point', 'There are no past events now', 'There are no present events now', 'There are no future events now'];

export {
  emptyTexts,
  sortingTypes,
  filterTypes,
  offers,
  photos,
  destinations,
  eventTypes
};
