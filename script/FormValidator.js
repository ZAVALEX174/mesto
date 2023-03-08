export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    this._enableFormValidation();

    this._addInputListeners();
    this._toggleButton();
  }

  _disableSubmit(evt) {
    evt.preventDefault();
  }

  _enableFormValidation() {
    this._form.addEventListener("submit", this._disableSubmit);
    this._form.addEventListener("input", () => {
      this._toggleButton();
    });

    this._form.addEventListener("reset", () => {
      this._toggleButton();
    });
  }

  _handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    const errorElementVisible = document.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
      this._hideInputError(input);
      errorElementVisible.textContent = "";
    } else {
      this._showInputError(input);
      errorElementVisible.textContent = input.validationMessage;
    }
  }

  _hideInputError(input) {
    input.classList.remove(this._config.inputErrorClass);
  }

  _showInputError(input) {
    input.classList.add(this._config.inputErrorClass);
  }

  _toggleButton() {
    const buttonSubmit = this._form.querySelector(
      this._config.submitButtonSelector
    );
    const isFormValid = this._form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle("popup__button_disabled", !isFormValid);
  }

  _addInputListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    const _this = this; // Это нужно т.к. inputList.forEach меняет контекст this на item, в _this содержится ссылка на this

    inputList.forEach(function (item) {
      item.addEventListener("input", (evt) => {
        _this._handleFormInput(evt);
      });
    });
  }
}
