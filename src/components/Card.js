"use strict";

export default class Card {
  constructor({ data, handleCardClick}, selector, ) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
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

    this._likeButton = this._element.querySelector(".element__icon");

    this._setEventListeners();

    return this._element;
  }

  // устанавливаем слушатели
  _setEventListeners() {
    this._setEventLikeButtonClick();
    this._deleteButtonClick();

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setEventLikeButtonClick() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element_active");
    });
  }

  _deleteButtonClick() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }
}
