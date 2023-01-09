"use strict";
const openPopup = document.querySelector(".profile__btn-editing");
const closePopup = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

let nameInput = document.querySelector(".popup__input_text_user");
let jobInput = document.querySelector(".popup__input_text_job");
let nameInputRec = document.querySelector(".profile__title");
let jobInputRec = document.querySelector(".profile__subtitle");

openPopup.addEventListener("click", function () {
  popup.classList.add("popup_active");

  nameInput.value = nameInputRec.textContent;
  jobInput.value = jobInputRec.textContent;
});

closePopup.addEventListener("click", function () {
  popup.classList.remove("popup_active");
});

const savePopup = document.querySelector(".popup__action");

savePopup.addEventListener("submit", function (evt) {
  evt.preventDefault();

  nameInputRec.textContent = nameInput.value;
  jobInputRec.textContent = jobInput.value;

  popup.classList.remove("popup_active");
});
