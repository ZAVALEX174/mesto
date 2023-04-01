export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
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
      setTimeout(() => {
        this._toggleButton();
      }, 0);
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
    const isFormValid = this._form.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(
      this._config.inactiveButtonClass,
      !isFormValid
    );
  }

  _addInputListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", (evt) => {
        this._handleFormInput(evt);
      });
    });
  }
}
