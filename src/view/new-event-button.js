import AbstractView from '../framework/view/abstract-view';

function createNewEventButton() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButton extends AbstractView {
  #handleButtonClick = null;

  constructor({ onButtonClick }) {
    super();
    this.#handleButtonClick = onButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createNewEventButton();
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    const userAgent = navigator.userAgent;
    const isSafari = !!userAgent.match(/Version\/[\d.]+.*Safari/);
    const isIphone = /iP(od|hone)/i.test(userAgent);
    try {
      if (isSafari || isIphone) {
        const clipboardItem = new ClipboardItem({
          'text/plain': new Promise((resolve) => {
            const status = 'fkh,gb';
            resolve(new Blob([status]));
          }),
        });
        navigator.clipboard.write([clipboardItem]);
      } else {
        const status = 'fkrewfdch,gb';
        setTimeout(() => {
          navigator.clipboard.writeText(status);
        });
      }
    } catch (error) {
      // console.log('fdvbfdvbdf');
    }
    //dispatch(toggleFavoriteStatus({ offerId: offerId, status: status }));
    this.#handleButtonClick();
  };
}
