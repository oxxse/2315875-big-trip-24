import Header from './presenter/header';
import EventList from './presenter/events-list';
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

const mainContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const infoContainerElement = document.querySelector('.trip-events');
const buttonContainerElement = document.querySelector('.trip-main');
const eventsModel = new EventsModel;
const destinationsModel = new DestinationsModel;
const offersModel = new OffersModel;

const headerPresenter = new Header(mainContainerElement, filterContainerElement, buttonContainerElement, eventsModel, destinationsModel, offersModel);
const eventListPresenter = new EventList(infoContainerElement, eventsModel, destinationsModel, offersModel);
headerPresenter.init();
eventListPresenter.init();
