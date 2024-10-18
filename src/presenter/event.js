import EventItem from '../view/event-item';
import PointEditForm from '../view/point-edit-form';
import { remove, render, replace } from '../framework/render';
import { Mode, UpdateType, UserAction } from '../const';

export default class Event {
  #eventListElement = null;
  #eventItem = null;
  #event = null;
  #offers = [];
  #destinations = [];
  #editForm = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.VIEWING;

  constructor({ eventListElement, offers, destinations, onDataChange, onModeChange }) {
    this.#eventListElement = eventListElement;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editForm.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editForm.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.VIEWING) {
      this.#eventItem.shake();
      return;
    }

    const resetFormState = () => {
      this.#editForm.updateElement({
        isDisabled: true,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editForm.shake(resetFormState);
  }

  init(event) {
    this.#event = event;
    const prevEventItem = this.#eventItem;
    const prevEditForm = this.#editForm;

    this.#eventItem = new EventItem({
      event: this.#event,
      offersData: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditButtonClick,
      onFavoriteClick: this.#handleFavoriteButtonClick
    });

    this.#editForm = new PointEditForm({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      isEdit: true,
      onFormSubmit: this.#handleSubmitClick,
      onFormReset: this.#handleResetClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (!prevEventItem || !prevEditForm) {
      render(this.#eventItem, this.#eventListElement);
      return;
    }

    if (this.#mode === Mode.VIEWING) {
      replace(this.#eventItem, prevEventItem);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editForm, prevEditForm);
      this.#mode = Mode.VIEWING;
    }

    remove(prevEventItem);
    remove(prevEditForm);
  }

  resetFormView() {
    if (this.#mode !== Mode.VIEWING) {
      this.#editForm.reset();
      this.#replaceEditFormToEvent();
    }
  }

  destroy() {
    remove(this.#eventItem);
    remove(this.#editForm);
  }

  #replaceEventToEditForm() {
    this.#handleModeChange();
    replace(this.#editForm, this.#eventItem);
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToEvent() {
    replace(this.#eventItem, this.#editForm);
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
    this.#mode = Mode.VIEWING;
  }

  #escapeKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editForm.reset();
      this.#replaceEditFormToEvent();
      document.removeEventListener('keydown', this.#escapeKeydownHandler);
    }
  };

  #handleEditButtonClick = () => {
    this.#replaceEventToEditForm();
  };

  #handleFavoriteButtonClick = () => {
    this.#handleDataChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, { ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #handleSubmitClick = (updateItem) => {
    this.#handleDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, updateItem);
  };

  #handleResetClick = () => {
    this.#editForm.reset(this.#event);
    this.#replaceEditFormToEvent();
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };
}
