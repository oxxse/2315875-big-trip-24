import EventList from '../view/event-list';
import SortingForm from '../view/sorting-form';
import EventItem from '../view/event-item';
import PointEditForm from '../view/point-edit-form';
import { render, replace } from '../framework/render';
import NoPoints from '../view/no-points';

export default class EventsList {
  #eventListComponent = new EventList;
  #sortingContainer = null;
  #eventsModel = null;

  constructor(sortingContainer, eventsModel) {
    this.#sortingContainer = sortingContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.offersList = [...this.#eventsModel.offers];
    this.destinationsList = [...this.#eventsModel.destinations];

    if (this.eventsList.length === 0) {
      render(new NoPoints(), this.#eventListComponent);
      return;
    }

    render(new SortingForm(), this.#sortingContainer);
    render(this.#eventListComponent, this.#sortingContainer);
    // render(new PointEditForm({ point: this.eventsList[0], offers: this.offersList, destinations: this.destinationsList, isEdit: true }), this.#eventListComponent.element);

    for (let i = 0; i < this.eventsList.length; i++) {
      this.#renderEvent(this.eventsList[i]);
    }
  }

  #renderEvent(point) {
    const handlerEscapeKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToEvent();
        document.removeEventListener('keydown', handlerEscapeKeydown);
      }
    };

    const eventItem = new EventItem({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      onEditClick: () => {
        replaceEventToEditForm();
        document.addEventListener('keydown', handlerEscapeKeydown);
      }
    });

    const editForm = new PointEditForm({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      isEdit: true,
      onFormSubmit: () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', handlerEscapeKeydown);
      },
      onFormReset: () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', handlerEscapeKeydown);
      }
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
