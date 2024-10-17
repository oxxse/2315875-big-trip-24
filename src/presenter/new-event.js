import {UserAction, UpdateType } from '../const';
import PointEditForm from '../view/point-edit-form';
import { RenderPosition, render, remove } from '../framework/render';

export default class NewEvent {
  #eventListContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #formComponent = null;

  constructor({ eventListContainer, destinationsModel, offersModel, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new PointEditForm({ offers: this.#offersModel.offers, destinations: this.#destinationsModel.destinations, isEdit: false, onFormSubmit: this.#handleFormSubmit, onFormReset: this.#handleCancelClick, onDeleteClick: this.#handleCancelClick});
    render(this.#formComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#formComponent.updateElement({isSaving: true});
  }

  setAborting() {
    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#formComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#formComponent);
    this.#formComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      event
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

