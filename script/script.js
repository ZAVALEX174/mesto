"use strict";
const openPopup = document.querySelector(".profile__btn-editing");
const closePopup = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

let nameInput = document.querySelector(".popup__input_text_user");
let jobInput = document.querySelector(".popup__input_text_job");
let nameInputRec = document.querySelector(".profile__title");
let jobInputRec = document.querySelector(".profile__subtitle");

openPopup.addEventListener("click", function () {
  popup.classList.add("popup_opened");

  nameInput.value = nameInputRec.textContent;
  jobInput.value = jobInputRec.textContent;
});

closePopup.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

const savePopup = document.querySelector(".popup__action");

savePopup.addEventListener("submit", function (evt) {
  evt.preventDefault();

  nameInputRec.textContent = nameInput.value;
  jobInputRec.textContent = jobInput.value;

  popup.classList.remove("popup_opened");
});

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const openPopupImg = document.querySelector(".profile__btn");
const closePopupImg = document.querySelector(".popup__close_image");
const popupImg = document.querySelector(".popup_image");

openPopupImg.addEventListener("click", function () {
  popupImg.classList.add("popup_opened");
});

closePopupImg.addEventListener("click", function () {
  popupImg.classList.remove("popup_opened");
});

const savePopupImg = document.querySelector(".popup__action");

savePopupImg.addEventListener("submit", function (evt) {
  evt.preventDefault();

  popupImg.classList.remove("popup_opened");
});

const element = document.querySelector(".element");
const form = document.querySelector(".popup__action_image");
const inputTextImage = document.querySelector(".popup__input_text_image-name");
const inputLinkImage = document.querySelector(".popup__input_text_image-link");
const template = document.querySelector("#element__card-template").content;

const createTask = (taskName) => {
  const elementCard = template.querySelector(".element__card").cloneNode(true);
  elementCard.querySelector(".element__title").textContent = taskName.name;
  elementCard.querySelector(".element__image").alt = taskName.name;
  elementCard.querySelector(".element__image").src = taskName.link;

  const deleteBtnElement = elementCard.querySelector(".element__delete");
  deleteBtnElement.addEventListener("click", () => {
    elementCard.remove();
  });

  const buttonsLike = elementCard.querySelectorAll(".element__icon")[0];

  buttonsLike.addEventListener("click", (likeButton) => {
    if (buttonsLike.classList.contains("element_active")) {
      buttonsLike.classList.remove("element_active");
    } else {
      buttonsLike.classList.add("element_active");
    }
  });

  const openPopupImage = elementCard.querySelectorAll(".element__image")[0];
  openPopupImage.addEventListener("click", () => {
    const bigImagePopup = document.querySelectorAll(".popup_big")[0];

    bigImagePopup.querySelector(".popup-title").textContent =
      elementCard.querySelector(".element__title").textContent;

    bigImagePopup.querySelector(".popup-img_big").src =
      elementCard.querySelector(".element__image").src;

    bigImagePopup.querySelector(".popup-img_big").alt =
      elementCard.querySelector(".element__image").alt;

    bigImagePopup.classList.add("popup_opened");
  });

  const closePopupBig = document.querySelector(".popup__close_big");
  const PopupBig = document.querySelector(".popup_big");
  closePopupBig.addEventListener("click", function () {
    PopupBig.classList.remove("popup_opened");
  });

  return elementCard;
};

const renderTask = (taskName) => {
  element.prepend(createTask(taskName));
};

initialCards.forEach((item) => {
  renderTask(item);
});

const formSubmitHander = (evt) => {
  evt.preventDefault();

  const taskName = { name: inputTextImage.value, link: inputLinkImage.value };

  renderTask(taskName);

  inputTextImage.value = "";
  inputLinkImage.value = "";

  popupImg.classList.remove("popup_opened");
};

form.addEventListener("submit", formSubmitHander);
