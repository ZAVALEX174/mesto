"use stric";
const openPopup = document.querySelector(".profile__popup-open");
const closePopup = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

openPopup.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.add("popup__active");
});

closePopup.addEventListener("click", function () {
  popup.classList.remove("popup__active");
});

const savePopup = document.querySelector(".popup__action");

savePopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  popup.classList.remove("popup__active");

  let nameInput = document.querySelector(".popup__text-user");
  let jobInput = document.querySelector(".popup__text-job");
  let nameInputRec = document.querySelector(".profile__title");
  let jobInputRec = document.querySelector(".profile__subtitle");

  nameInputRec.textContent = nameInput.value;
  jobInputRec.textContent = jobInput.value;
});
