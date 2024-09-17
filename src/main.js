import Header from './presenter/header';
import EventList from './presenter/events-list';
import EventsModel from './model/events-model';

const mainContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const infoContainerElement = document.querySelector('.trip-events');
const buttonContainerElement = document.querySelector('.trip-main');
const eventsModel = new EventsModel;

const headerPresenter = new Header(mainContainerElement, filterContainerElement, buttonContainerElement, eventsModel);
const eventListPresenter = new EventList(infoContainerElement, eventsModel);
headerPresenter.init();
eventListPresenter.init();
