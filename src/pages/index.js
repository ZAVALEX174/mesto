import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

// Добавление карточек из массива
const popupImage = new PopupWithImage(".popup_big");
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// возвращает карточку:
function createCard(item) {
  const card = new Card(
    { data: item, handleCardClick: handleCardClick },
    "#element__card-template"
  );
  const cardElement = card.generate();
  return cardElement;
}

//отрисовываем полученые карточки:
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".element"
);
cardList.renderItems();

// Форма добавления карточки:
function handleSubmitFormAddCard(evt) {
  evt.preventDefault();

  const cardElement = createCard(popupFormAddCard.formValues);
  cardList.addItem(cardElement);

  popupFormAddCard.close();
}

const popupFormAddCard = new PopupWithForm(
  ".popup_image",
  handleSubmitFormAddCard
);
popupFormAddCard.setEventListeners();

const buttonOpenPopupWithImage = document.querySelector(".profile__btn");
buttonOpenPopupWithImage.addEventListener("click", () => {
  popupFormAddCard.open();
});

const userInfoName = document.querySelector(".profile__title");
const userInfoJob = document.querySelector(".profile__subtitle");
const userInfoNameInput = document.querySelector(".popup__input_text_user");
const userInfoJobInput = document.querySelector(".popup__input_text_job");

//создание экземпляра UserInfo:
const userInfo = new UserInfo({ name: userInfoName, job: userInfoJob });
const popupFormUserInfo = new PopupWithForm(
  ".profile-popup",
  handleSubmitFormProfileEdit
);

popupFormUserInfo.setEventListeners();

const buttonOpenPopupUserInfo = document.querySelector(".profile__btn-editing");
buttonOpenPopupUserInfo.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  userInfoNameInput.value = userData.name;
  userInfoJobInput.value = userData.job;

  popupFormUserInfo.open();
});

// Форма редактирования профиля
function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo(popupFormUserInfo.formValues);

  popupFormUserInfo.close();
}

// Валидация форм
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

formList.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});
