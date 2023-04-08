import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);

    this._submitForm = this._popup.querySelector('.popup__form');

    this._callbackSubmitForm = (evt) => {
      evt.preventDefault();
      callbackSubmitForm(this._card);
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitForm.addEventListener("submit", (evt) => {
      this._callbackSubmitForm(evt);
    });
  }

  close() {
    this._submitForm.reset();
    super.close();
  }

  open(card) {
    this._card = card;
    super.open();
  }
}
