import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._selector = popupSelector;
    this._callbackSubmitForm = callbackSubmitForm;
    this._popup = document.querySelector(this._selector);

    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitForm = this._popup.querySelector('.popup__form');

    this._submitForm.addEventListener('submit', (evt) => {
      this._getInputValues();
      this._callbackSubmitForm(evt);
    });
  }

  _getElement() {
    const formElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.popup__form')
    .cloneNode(true);

    return formElement;
  }

  generate() {
    this._element = this._getElement(); // создаём элемент
    this._setEventListeners(); // добавляем обработчики

      return this._element; // возвращаем наружу
  }

  setEventListeners() {
    super.setEventListeners();
  }

  close() {
    this._submitForm.reset();
    super.close();
  }

  _getInputValues() {
    this.formValues = {};
    this._inputList.forEach(input => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }
}
