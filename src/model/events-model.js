import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #offersModel = null;
  #destinationsModel = null;
  #events = [];
  #isError = false;

  constructor({ eventsApiService, offersModel, destinationsModel }) {
    super();
    this.#eventsApiService = eventsApiService;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get events() {
    return this.#events;
  }

  get error() {
    return this.#isError;
  }

  async init() {
    try {
      await Promise.all([
        this.#offersModel.init(),
        this.#destinationsModel.init()
      ]);
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch (error) {
      this.#events = [];
      this.#isError = true;
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, updateItem) {
    const index = this.#events.findIndex((event) => event.id === updateItem.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(updateItem);
      const updatedItem = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedItem,
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType, updatedItem);
    } catch (error) {
      throw new Error('Can\'t update event');
    }
  }

  async deleteEvent(updateType, item) {
    const index = this.#events.findIndex((event) => event.id === item.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(item);

      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1)
      ];
      this._notify(updateType);
    } catch (error) {
      throw new Error('Can\'t delete event');
    }
  }

  async addEvent(updateType, item) {

    try {
      const response = await this.#eventsApiService.addEvent(item);
      const newEvent = this.#adaptToClient(response);
      this.#events = [
        newEvent,
        ...this.#events
      ];
      this._notify(updateType, item);
    } catch (error) {
      throw new Error('Can\'t add event');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      price: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
