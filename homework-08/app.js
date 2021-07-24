const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// 1) Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

const pictureContainer = document.querySelector('.js-gallery');

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

const modalEl = document.querySelector('.js-lightbox');
const modalPicture = document.querySelector('.lightbox__image');

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

const closeButtonRef = document.querySelector('.lightbox__button');
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