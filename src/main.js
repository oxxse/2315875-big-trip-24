import Header from './presenter/header';
import EventList from './presenter/events-list';
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FiltersModel from './model/filters-model';
import Filter from './presenter/filter';

const mainContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const infoContainerElement = document.querySelector('.trip-events');
const buttonContainerElement = document.querySelector('.trip-main');
const eventsModel = new EventsModel;
const destinationsModel = new DestinationsModel;
const offersModel = new OffersModel;
const filtersModel = new FiltersModel;

const headerPresenter = new Header(mainContainerElement, buttonContainerElement, eventsModel, destinationsModel);
const eventListPresenter = new EventList(infoContainerElement, eventsModel, destinationsModel, offersModel, filtersModel);
const filtersPresenter = new Filter(filterContainerElement, eventsModel, filtersModel);

headerPresenter.init();
eventListPresenter.init();
filtersPresenter.init();
