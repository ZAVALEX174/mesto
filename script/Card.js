"use strict";
/*
import {
  openPopup,
  emergenceBigImagePopup,
  emergenceBigTitlePopup,
  bigImagePopup,
} from "./index.js";
*/

export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const сardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element__card")
      .cloneNode(true);

    return сardElement;
  }

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

  _setEventListeners() {
    this._setEventLikeButtonClick();
    this._deleteButtonClick();
    //this._setEventOpenPopupBigImageClick();

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

  /*
  Это удали, оно больше не нужно, т.к. handleCardClick используется
  _setEventOpenPopupBigImageClick() {
    this._cardImage.addEventListener("click", () => {
      emergenceBigTitlePopup.textContent = this._name;
      emergenceBigImagePopup.src = this._link;
      emergenceBigImagePopup.alt = this._name;

      openPopup(bigImagePopup);
    });
  }
  */
}
