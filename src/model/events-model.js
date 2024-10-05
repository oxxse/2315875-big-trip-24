import Observable from '../framework/observable.js';
import { getEvents } from '../mock/event.js';

export default class EventsModel extends Observable {
  #events = getEvents();

  get events() {
    return this.#events;
  }

  updateEvent(updateType, updateItem) {
    const index = this.#events.findIndex((event) => event.id === updateItem.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      updateItem,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, updateItem);
  }

  deleteEvent(updateType, updateItem) {
    const index = this.#events.findIndex((event) => event.id === updateItem.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  addEvent(updateType, updateItem) {
    this.#events = [
      updateItem,
      ...this.#events
    ];

    this._notify(updateType, updateItem);
  }
}
