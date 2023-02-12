"use strict";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function disableSubmit(evt) {
  evt.preventDefault();
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

function enableFormValidation(form, config) {
  form.addEventListener("submit", disableSubmit);
  form.addEventListener("input", () => {
    toggleButton(form, config);
  });

  addInputListeners(form, config);
  toggleButton(form, config);
}

function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElementVisible = document.querySelector(`#${inputId}-error`);

  function hideInputError(input) {
    input.classList.remove(config.inputErrorClass);
  }

  function showInputError(input) {
    input.classList.add(config.inputErrorClass);
  }

  if (input.validity.valid) {
    hideInputError(input);
    errorElementVisible.textContent = "";
  } else {
    showInputError(input);
    errorElementVisible.textContent = input.validationMessage;
  }
}

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle("popup__button_disabled", !isFormValid);
}

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener("input", (evt) => {
      handleFormInput(evt, config);
    });
  });
}

enableValidation(validationConfig);
