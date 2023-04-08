"use strict";

export default class Card {
  constructor(
      userId,
      data,
      selector,
      {
        handleCardClick,
        handleRemoveCardClick,
        handleLikeClick
      }
  ) {
    this._id = data._id;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
  }

// получаем элемент
  _getElement() {
    const сardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element__card")
      .cloneNode(true);

    return сardElement;
  }

//генерируем
  generate() {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector(".element__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._likeCount = this._element.querySelector(".element__count-likes");
    this._likeButton = this._element.querySelector(".element__icon");
    this._deleteButton = this._element.querySelector(".element__delete");

    if (this._userId != this._ownerId) {
      this._deleteButton.remove();
    }

    this._setLike();
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
  }

  getId() {
    return this._id;
  }

  _setLike() {
    this._isLiked = false;
    this._likes.forEach((likeUser) => {
      if (likeUser._id == this._userId) {
        this._isLiked = true;
      }
    }, this);

    if (this._isLiked) {
      this._likeButton.classList.add('element_active');
    }
    else {
      this._likeButton.classList.remove('element_active');
    }

    this._likeCount.textContent = this._likes.length;
  }

  // устанавливаем слушатели
  _setEventListeners() {
    this._setEventLikeButtonClick();

    if (this._userId == this._ownerId) {
      this._deleteButtonClick();
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setEventLikeButtonClick() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked)
          .then((card) => {
            this._likes = card.likes;
            this._setLike();
          })
          .catch((msg) => {
            console.log(`Ошибка ${msg}`)
          });
    });
  }

  _deleteButtonClick() {
    this._deleteButton.addEventListener("click", () => {
      this._handleRemoveCardClick(this);
    });
  }
}
