import EventList from './presenter/events-list';
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FiltersModel from './model/filters-model';
import Filter from './presenter/filter';
import NewEventButton from './view/new-event-button';
import { render } from './framework/render';
import EventsApiService from './service/events-api-service';
import { AUTHORIZATION, END_POINT } from './const';

const mainContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const infoContainerElement = document.querySelector('.trip-events');
const buttonContainerElement = document.querySelector('.trip-main');

const eventsApiService = new EventsApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel({ eventsApiService });
const destinationsModel = new DestinationsModel({ eventsApiService });
const eventsModel = new EventsModel({ eventsApiService, offersModel, destinationsModel });
const filtersModel = new FiltersModel();
const newPointButtonComponent = new NewEventButton({ onClick: handleNewPointButtonClick });

const eventListPresenter = new EventList(infoContainerElement, eventsModel, destinationsModel, offersModel, filtersModel, mainContainerElement, handleNewPointFormClose);
const filtersPresenter = new Filter(filterContainerElement, eventsModel, filtersModel);

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  eventListPresenter.createEvent();
  newPointButtonComponent.element.disabled = true;
}

eventsModel.init()
  .finally(() => {
    render(newPointButtonComponent, buttonContainerElement);
    eventListPresenter.init();
    filtersPresenter.init();
  });
