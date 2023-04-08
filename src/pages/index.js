import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { validationConfig } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

// Инициализируем API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "2a1090a1-694e-4eb0-a8c1-0bf361e0cc8b",
    "Content-Type": "application/json",
  },
});

//создание экземпляра UserInfo:
const userInfoName = document.querySelector(".profile__title");
const userInfoJob = document.querySelector(".profile__subtitle");
const userInfoAvatar = document.querySelector(".profile__image");

const userInfo = new UserInfo({
  name: userInfoName,
  about: userInfoJob,
  avatar: userInfoAvatar,
});

// Форма редактирования профиля
function handleSubmitFormProfileEdit(evt) {
  evt.preventDefault();

  popupFormUserInfo.showLoading();

  api
    .setUserProfile(popupFormUserInfo.formValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormUserInfo.close();
    })
    .catch((msg) => {
      console.log(`Ошибка: ${msg}`);
    })
    .finally(() => {
      popupFormUserInfo.hideLoading();
    });
}

const popupFormUserInfo = new PopupWithForm(
  ".profile-popup",
  handleSubmitFormProfileEdit
);
popupFormUserInfo.setEventListeners();

const buttonOpenPopupUserInfo = document.querySelector(".profile__btn-editing");
buttonOpenPopupUserInfo.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupFormUserInfo.setInputValues(userData);
  popupFormUserInfo.open();
});

// Редактирование аватара
function handleSubmitFormAvatarEdit(evt) {
  evt.preventDefault();

  popupAvatarEditForm.showLoading();

  api
    .setAvatar(popupAvatarEditForm.formValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatarEditForm.close();
    })
    .catch((msg) => {
      console.log(`Ошибка: ${msg}`);
    })
    .finally(() => {
      popupAvatarEditForm.hideLoading();
    });
}

const popupAvatarEditForm = new PopupWithForm(
  ".popup_avatar-form",
  handleSubmitFormAvatarEdit
);
popupAvatarEditForm.setEventListeners();
const avatarEditButton = document.querySelector(".profile__avatar-wrapper");
avatarEditButton.addEventListener("click", () => {
  popupAvatarEditForm.open();
});

// Форма подтверждение удаления
const popupConfirmation = new PopupWithConfirmation(
  ".popup_confirm",
  (card) => {
    api
      .removeCard(card.getId())
      .then(() => {
        card.removeCard();
        popupConfirmation.close();
      })
      .catch((msg) => {
        console.log(`Ошибка: ${msg}`);
      });
  }
);
popupConfirmation.setEventListeners();

// Валидация форм
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

formList.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});

// Получаем первоначальную информацию
const getUserInfo = api.getUserInfo();
const getInitialCards = api.getInitialCards();

getUserInfo.catch((msg) => {
  console.log(`Ошибка: ${msg}`);
});
getInitialCards.catch((msg) => {
  console.log(`Ошибка: ${msg}`);
});

const promiseAll = Promise.all([getUserInfo, getInitialCards]);
promiseAll.then(([arUserInfo, initialCards]) => {
  // Устанавливаем имя, полученное с сервера
  userInfo.setUserInfo(arUserInfo);

  // Всплывающая картинка
  const popupImage = new PopupWithImage(".popup_big");
  popupImage.setEventListeners();

  // Выводим полученные с сервера карточки
  function createCard(item) {
    const card = new Card(arUserInfo._id, item, "#element__card-template", {
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
      handleRemoveCardClick: (card) => {
        popupConfirmation.open(card);
      },
      handleLikeClick: (cardId, isLiked) => {
        if (isLiked) {
          return api.removeLikeCard(cardId);
        } else {
          return api.likeCard(cardId);
        }
      },
    });
    const cardElement = card.generate();
    return cardElement;
  }

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

    popupFormAddCard.showLoading();
    const addNewCard = api.addCard(popupFormAddCard.formValues);
    addNewCard
      .then((card) => {
        const cardElement = createCard(card);
        cardList.addItem(cardElement);
        popupFormAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      })
      .finally(() => {
        popupFormAddCard.hideLoading();
      });
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
});
