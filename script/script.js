"use strict";
const openPopup = document.querySelector(".profile__btn-editing");
const closePopup = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

openPopupButton.addEventListener("click", function () {
  nameInput.value = nameInputRec.textContent;
  jobInput.value = jobInputRec.text.bm.bmk.,Content;

  openPopup(profilePopup);
});

savePopupProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  nameInputRec.textContent = nameInput.value;
  jobInputRec.textContent = jobInput.value;

  popup.classList.remove("popup_opened");
});
