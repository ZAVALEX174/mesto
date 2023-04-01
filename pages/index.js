import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

// Добавление карточек из массива
function handleCardClick(name, link) {
  const popupImage = new PopupWithImage('.popup_big');
  popupImage.open(name, link);
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const сard = new Card({data: item, handleCardClick: handleCardClick}, "#element__card-template");
      const cardElement = сard.generate();
      cardList.addItem(cardElement);
    },
  },
  ".element"
);
cardList.renderItems();


// Форма добавления карточки
function handleSubmitFormAddCard(evt) {
  evt.preventDefault();

  const card = new Card(
    {
      data: {name: popupFormAddCard.formValues.name, link: popupFormAddCard.formValues.link },
      handleCardClick: handleCardClick
    },
    "#element__card-template"
  );
  const cardElement = card.generate();
  cardList.addItem(cardElement);

  popupFormAddCard.close();
}

const popupFormAddCard = new PopupWithForm('.popup_image', handleSubmitFormAddCard);
const buttonOpenPopupWithImage = document.querySelector('.profile__btn');
buttonOpenPopupWithImage.addEventListener('click', () => {
  popupFormAddCard.open();
});


// Форма редактирования профиля
function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({name: popupFormUserInfo.formValues.name, job: popupFormUserInfo.formValues.job})

  popupFormUserInfo.close();
}

const userInfoName = document.querySelector(".profile__title");
const userInfoJob = document.querySelector(".profile__subtitle");
const userInfoNameInput = document.querySelector(".popup__input_text_user");
const userInfoJobInput = document.querySelector(".popup__input_text_job");

const userInfo = new UserInfo({name: userInfoName, job: userInfoJob});
const popupFormUserInfo = new PopupWithForm('.profile-popup', handleSubmitFormProfileEdit);

const buttonOpenPopupUserInfo = document.querySelector('.profile__btn-editing');
buttonOpenPopupUserInfo.addEventListener('click', () => {
  userInfoNameInput.value = userInfoName.textContent;
  userInfoJobInput.value = userInfoJob.textContent;

  popupFormUserInfo.open();
});


// Валидация форм
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

formList.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});
