import TripInfo from '../view/trip-info';
import Filters from '../view/filter';
import { render, RenderPosition } from '../render';

export default class Header {
  constructor(infoContainer, filterContainer) {
    this.infoContainer = infoContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render(new TripInfo(), this.infoContainer, RenderPosition.AFTERBEGIN);
    render(new Filters(), this.filterContainer);
  }
}
