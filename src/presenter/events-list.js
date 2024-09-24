import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import EventItem from '../view/event-item';
import PointEditForm from '../view/point-edit-form';
import { render, replace } from '../framework/render';
import NoPoints from '../view/no-points';

export default class EventsList {
  #eventListComponent = new EventList;
  #infoContainer = null;
  #eventsModel = null;

  constructor(infoContainer, eventsModel) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.offersList = [...this.#eventsModel.offers];
    this.destinationsList = [...this.#eventsModel.destinations];

    if (this.eventsList.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderSorting();
      this.#renderEventsList();
    }
  }

  #renderNoPoints() {
    render(new NoPoints(), this.#infoContainer);
  }

  #renderSorting() {
    render(new SortingForm(), this.#infoContainer);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#infoContainer);
    this.eventsList.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(point) {
    const escapeKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToEvent();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    };

    const showEventEditor = () => {
      replaceEventToEditForm();
      document.addEventListener('keydown', escapeKeydownHandler);
    };

    const hideEventEditor = () => {
      replaceEditFormToEvent();
      document.removeEventListener('keydown', escapeKeydownHandler);
    };

    const eventItem = new EventItem({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      onEditClick: () => showEventEditor()
    });

    const editForm = new PointEditForm({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      isEdit: true,
      onFormSubmit: () => hideEventEditor(),
      onFormReset: () => hideEventEditor()
    });

    function replaceEventToEditForm() {
      replace(editForm, eventItem);
    }

    function replaceEditFormToEvent() {
      replace(eventItem, editForm);
    }

    render(eventItem, this.#eventListComponent.element);
  }
}
