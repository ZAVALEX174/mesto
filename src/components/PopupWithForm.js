import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;

    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._submitForm = this._popup.querySelector(".popup__form");

    this._submitButton = this._popup.querySelector('.popup__save');
    this._submitButtonText = this._submitButton.textContent;
    this._loadingText = "Сохранение...";
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitForm.addEventListener("submit", (evt) => {
      this._getInputValues();
      this._callbackSubmitForm(evt);
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._submitForm.reset();
    super.close();
  }

  //собирает данные всех полей формы
  _getInputValues() {
    this.formValues = {};
    this._inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingText;
  }

  hideLoading() {
    this._submitButton.textContent = this._submitButtonText;
  }
}
