"use strict";

import {
  openPopup,
  emergenceBigImagePopup,
  emergenceBigTitlePopup,
  bigImagePopup,
} from "./index.js";

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
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
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._setEventLikeButtonClick();
    this._deleteButtonClick();
    this._setEventOpenPopupBigImageClick();
  }

  _setEventLikeButtonClick() {
    this._element
      .querySelector(".element__icon")
      .addEventListener("click", () => {
        this._element
          .querySelector(".element__icon")
          .classList.toggle("element_active");
      });
  }

  _deleteButtonClick() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }

  _setEventOpenPopupBigImageClick() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        emergenceBigTitlePopup.textContent =
          this._element.querySelector(".element__title").textContent;

        emergenceBigImagePopup.src =
          this._element.querySelector(".element__image").src;

        emergenceBigImagePopup.alt =
          this._element.querySelector(".element__image").alt;

        openPopup(bigImagePopup); 
      });
  }
}
