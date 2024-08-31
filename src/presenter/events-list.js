import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import { render } from '../render';

export default class EventsList {
  constructor(sortingContainer) {
    this.sortingContainer = sortingContainer;
  }

  init() {
    render(new SortingForm(), this.sortingContainer);
    render(new EventList(), this.sortingContainer);
  }
}
