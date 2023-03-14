import Card from "./Card.js";
import initialCards from "./constants.js";
import FormValidator from "./FormValidator.js";

const openPopupButton = document.querySelector(".profile__btn-editing");
const profilePopup = document.querySelector(".profile-popup");
const popupImg = document.querySelector(".popup_image");
const PopupBig = document.querySelector(".popup_big");
const savePopupProfileForm = document.querySelector(".popup__action_profile");
const openPopupImgButton = document.querySelector(".profile__btn");
const savePopupImgForm = document.querySelector(".popup__action_image");
const cardSection = document.querySelector(".element");
const inputTextImage = document.querySelector(".popup__input_text_image-name");
const inputLinkImage = document.querySelector(".popup__input_text_image-link");
const template = document.querySelector("#element__card-template").content;
const nameInput = document.querySelector(".popup__input_text_user");
const jobInput = document.querySelector(".popup__input_text_job");
const nameInputRec = document.querySelector(".profile__title");
const jobInputRec = document.querySelector(".profile__subtitle");
const closeButtons = document.querySelectorAll(".popup__close");
const bigImagePopup = document.querySelector(".popup_big");
const emergenceBigTitlePopup = document.querySelector(".popup-title");
const emergenceBigImagePopup = document.querySelector(".popup-img_big");

function handleCardClick(name, link) {
  emergenceBigTitlePopup.textContent = name;
  emergenceBigImagePopup.src = link;
  emergenceBigImagePopup.alt = name;

  openPopup(bigImagePopup);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("mousedown", closePopupClickingDarkArea);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener("mousedown", closePopupClickingDarkArea);
}

function closePopupClickingDarkArea(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

openPopupButton.addEventListener("click", function () {
  nameInput.value = nameInputRec.textContent;
  jobInput.value = jobInputRec.textContent;

  openPopup(profilePopup);
});

savePopupProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  nameInputRec.textContent = nameInput.value;
  jobInputRec.textContent = jobInput.value;

  closePopup(profilePopup);
});

openPopupImgButton.addEventListener("click", function () {
  openPopup(popupImg);
});

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const сard = new Card(item, "#element__card-template", handleCardClick);
  const cardElement = сard.generate();
  return cardElement;
}

savePopupImgForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const item = { name: inputTextImage.value, link: inputLinkImage.value };

  createCard(item);

  cardSection.prepend(createCard(item));

  savePopupImgForm.reset();
  closePopup(popupImg);
});

export {
  openPopup,
  emergenceBigImagePopup,
  emergenceBigTitlePopup,
  bigImagePopup,
};
export { savePopupImgForm };

initialCards.forEach((item) => {
  const сardElement = createCard(item);
  cardSection.prepend(сardElement);
});

// валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

formList.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});
