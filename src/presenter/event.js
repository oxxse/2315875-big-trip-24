import EventItem from '../view/event-item';
import PointEditForm from '../view/point-edit-form';
import { remove, render, replace } from '../framework/render';
import { Mode } from '../const';

export default class Event {
  #eventListComponent = null;
  #eventItem = null;
  #event = null;
  #offers = [];
  #destinations = [];
  #editForm = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.VIEWING;

  constructor({ eventListComponent, offers, destinations, onDataChange, onModeChange }) {
    this.#eventListComponent = eventListComponent;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventItem = this.#eventItem;
    const prevEditForm = this.#editForm;

    this.#eventItem = new EventItem({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#editButtonClickHandler,
      onFavoriteClick: this.#favoriteButtonClickHandler
    });

    this.#editForm = new PointEditForm({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      isEdit: true,
      onFormSubmit: this.#editFormSubmitHandler,
      onFormReset: this.#editFormResetHandler
    });

    if (!prevEventItem || !prevEditForm) {
      render(this.#eventItem, this.#eventListComponent);
      return;
    }

    if (this.#mode === Mode.VIEWING) {
      replace(this.#eventItem, prevEventItem);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editForm, prevEditForm);
    }

    remove(prevEventItem);
    remove(prevEditForm);
  }

  resetFormView() {
    if (this.#mode !== Mode.VIEWING) {
      this.#replaceEditFormToEvent();
    }
  }

  destroy() {
    remove(this.#eventItem);
    remove(this.#editForm);
  }

  #replaceEventToEditForm() {
    replace(this.#editForm, this.#eventItem);
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToEvent() {
    replace(this.#eventItem, this.#editForm);
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
    this.#mode = Mode.VIEWING;
  }

  #escapeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToEvent();
    }
  };

  #editButtonClickHandler = () => {
    this.#replaceEventToEditForm();
  };

  #favoriteButtonClickHandler = () => {
    this.#handleDataChange({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #editFormSubmitHandler = () => {
    this.#replaceEditFormToEvent();
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
  };

  #editFormResetHandler = () => {
    this.#replaceEditFormToEvent();
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
  };
}
