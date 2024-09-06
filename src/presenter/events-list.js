import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import EventItem from '../view/event-item';
import PointEditForm from '../view/point-edit-form';
import { render } from '../render';

export default class EventsList {
  eventListComponent = new EventList;

  constructor(sortingContainer, eventsModel) {
    this.sortingContainer = sortingContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.eventsModel.getEvents()];
    this.offersList = [...this.eventsModel.getOffers()];
    this.destinationsList = [...this.eventsModel.getDestinations()];

    render(new SortingForm(), this.sortingContainer);
    render(this.eventListComponent, this.sortingContainer);
    render(new PointEditForm({ point: this.eventsList[0], offers: this.offersList, destinations: this.destinationsList }), this.eventListComponent.getElement());

    for (let i = 0; i < this.eventsList.length; i++) {
      const eventOffers = this.offersList.find((offer) => offer.type === this.eventsList[i].type);
      render(new EventItem({ point: this.eventsList[i], offers: eventOffers, destinations: this.destinationsList }), this.eventListComponent.getElement());
    }
  }
}
