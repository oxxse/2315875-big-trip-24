import Header from './presenter/header';
import EventList from './presenter/events-list';
import EventsModel from './model/events-model';

const infoContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const sortingContainerElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel;

const headerPresenter = new Header(infoContainerElement, filterContainerElement);
const eventListPresenter = new EventList(sortingContainerElement, eventsModel);

headerPresenter.init();
eventListPresenter.init();
