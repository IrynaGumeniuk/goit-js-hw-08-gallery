import galleryItems from "./js/object-gallery-item";
import { pictureContainer, modalEl, modalPicture, closeButtonRef } from "./js/query-selector-find-documents";

// 1) Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.


const picturesMarkup = createPictureGalleryMarkup(galleryItems);

pictureContainer.insertAdjacentHTML('beforeend', picturesMarkup);

function createPictureGalleryMarkup(pictures) {
  return pictures.map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
  <a target="_blank"
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  ` }).join('');
};

// 2) Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.

// 3) Открытие модального окна по клику на элементе галереи.


pictureContainer.addEventListener('click', onPictureContainerClick);

function onPictureContainerClick(e) {

  e.preventDefault();

  isOpenModal(e);

  onEnterOpener(e);

  console.log(e.target.dataset.source);
};

function isOpenModal(e) {
  modalEl.classList.add('is-open');
  modalPicture.alt = e.target.alt;
  modalPicture.src = e.target.dataset.source;
};

function onEnterOpener(e) {
  console.log(e.key);
  if (e.key !== "Enter") {
    return
  }
  isOpenModal(e);
}

// 4) Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// 5) Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.


closeButtonRef.addEventListener('click', onButtonClose);

function onButtonClose() {
  modalEl.classList.remove('is-open');
  modalPicture.alt = ' ';
  modalPicture.src = ' ';
}

// 6) Закрытие модального окна по клику на div.lightbox__overlay.

modalEl.addEventListener('click', onOverlayClickCloseModal);

function onOverlayClickCloseModal(e) {
  e.preventDefault();

  if (e.target.nodeName === 'IMG') {
    return;
  }
  modalEl.classList.remove('is-open');
  modalPicture.alt = ' ';
  modalPicture.src = ' ';

}

// 7) Закрытие модального окна по нажатию клавиши ESC.

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modalEl.classList.remove('is-open');
  }
});