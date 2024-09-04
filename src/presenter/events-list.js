import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import EventItem from '../view/event-item';
import PointForm from '../view/point-form';
import PointEditForm from '../view/point-edit-form';
import { render } from '../render';

const POINTS_COUNT = 3;

export default class EventsList {
  eventListComponent = new EventList;

  constructor(sortingContainer) {
    this.sortingContainer = sortingContainer;
  }

  init() {
    render(new SortingForm(), this.sortingContainer);
    render(this.eventListComponent, this.sortingContainer);
    render(new PointForm, this.eventListComponent.getElement());
    render(new PointEditForm, this.eventListComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new EventItem(), this.eventListComponent.getElement());
    }
  }
}
