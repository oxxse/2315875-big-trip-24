import Header from './presenter/header';
import EventList from './presenter/events-list';

const infoContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const sortingContainerElement = document.querySelector('.trip-events');

const headerPresenter = new Header(infoContainerElement, filterContainerElement);
const eventListPresenter = new EventList(sortingContainerElement);

headerPresenter.init();
eventListPresenter.init();
