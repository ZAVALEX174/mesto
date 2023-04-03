export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escKey = "Escape";
    this._handleEscClose = this._handleEscClose.bind(this);
    
  }

  open() {
    this._popup.classList.add("popup_opened");
    //слушатель на нажатие кнопки
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    //слушатель на нажатие кнопки
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === this._escKey) {
      this.close();
    }
  }

  //добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    //слушатель на клик мышки
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }

      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });

  }
}
