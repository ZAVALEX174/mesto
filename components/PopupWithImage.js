import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImages = this._popup.querySelector('.popup-img'); // либо popup-img_big
    this._popupImagesSignature = this._popup.querySelector('.popup-title');
  }

  open(name, link) {
    this._popupImages.src = link; //устанавливаем ссылку
    this._popupImages.alt = name; //устанавливаем альт
    this._popupImagesSignature.textContent = name;//устанавливаем подпись картинке
    super.open();
  }
}
