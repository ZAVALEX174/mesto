"use strict";

const openPopupButton = document.querySelector(".profile__btn-editing");
const profilePopup = document.querySelector(".profile-popup");
const popupImg = document.querySelector(".popup_image");
const PopupBig = document.querySelector(".popup_big");
const savePopupProfileForm = document.querySelector(".popup__action_profile");
const openPopupImgButton = document.querySelector(".profile__btn");
const savePopupImgForm = document.querySelector(".popup__action_image");
const element = document.querySelector(".element");
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

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupclickingDarkArea(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  closePopupclickingDarkArea(popup);
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

openPopupImgButton.addEventListener("click", function () {
  openPopup(popupImg);
});

const createTask = (taskName) => {
  const elementCard = template.querySelector(".element__card").cloneNode(true);
  elementCard.querySelector(".element__title").textContent = taskName.name;

  const elementCardImage = elementCard.querySelector(".element__image");
  elementCardImage.alt = taskName.name;
  elementCardImage.src = taskName.link;

  const deleteBtnElement = elementCard.querySelector(".element__delete");
  deleteBtnElement.addEventListener("click", () => {
    elementCard.remove();
  });

  const buttonsLike = elementCard.querySelector(".element__icon");

  buttonsLike.addEventListener("click", (likeButton) => {
    if (buttonsLike.classList.contains("element_active")) {
      buttonsLike.classList.remove("element_active");
    } else {
      buttonsLike.classList.add("element_active");
    }
  });

  const openPopupImage = elementCard.querySelector(".element__image");

  openPopupImage.addEventListener("click", () => {
    emergenceBigTitlePopup.textContent =
      elementCard.querySelector(".element__title").textContent;

    emergenceBigImagePopup.src =
      elementCard.querySelector(".element__image").src;

    emergenceBigImagePopup.alt =
      elementCard.querySelector(".element__image").alt;

    openPopup(bigImagePopup);
  });

  return elementCard;
};

const renderTask = (taskName) => {
  element.prepend(createTask(taskName));
};

initialCards.forEach((item) => {
  renderTask(item);
});

savePopupImgForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const taskName = { name: inputTextImage.value, link: inputLinkImage.value };

  renderTask(taskName);

  savePopupImgForm.reset();

  closePopup(popupImg);

  toggleButton(savePopupImgForm, validationConfig);
});
