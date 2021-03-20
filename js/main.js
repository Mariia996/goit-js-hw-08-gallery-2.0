const gallery = [
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

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(gallery);
galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);


function createGalleryMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
    </li>
    `}).join('');
}


galleryContainer.addEventListener('click', onGalleryContainerClick);

const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImgRef = lightboxRef.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('[data-action=close-lightbox]');

closeBtnRef.addEventListener('click', onModalCloseGallery);

function onGalleryContainerClick(e) {
  e.preventDefault();

  const clickOnPicture = e.target;
  onModalOpenGallery(clickOnPicture);

  onModalCloseGallery();

  e.stopPropagation();
}

function onModalOpenGallery(e) {
    const galleryImgClass = e.classList.contains('gallery__image');
    if (!galleryImgClass) {
    return;
    }

  if (e) {
    lightboxRef.classList.add('is-open');
    lightboxImgRef.src = e.dataset.source;
    lightboxImgRef.alt = e.alt;
  }
 console.log(e);

  window.addEventListener('keydown', onBtnPressToScrollOrCloseModal);
}

function onBtnPressToScrollOrCloseModal (e) {

  console.log(e.code);
  let index = gallery.findIndex(item => item.original === lightboxImgRef.src);

  if (e.code === 'ArrowRight') {
    ((index + 1) === gallery.length)? index = 0 : index += 1;
    lightboxImgRef.src = gallery[index].original;
  }

  if (e.code === 'ArrowLeft') {
    (index === 0) ? index = gallery.length - 1 : index -= 1;
    lightboxImgRef.src = gallery[index].original;
  }

  if (e.code === 'Escape') {
  lightboxRef.classList.remove('is-open');
  lightboxImgRef.src = '';
  lightboxImgRef.alt = '';
    window.removeEventListener('keydown', onBtnPressToScrollOrCloseModal);
  }
}

function onModalCloseGallery(e) {

   if (e) {
    lightboxRef.classList.remove('is-open');
    lightboxImgRef.src = '';
    lightboxImgRef.alt = '';
    window.removeEventListener('keydown', onBtnPressToScrollOrCloseModal);
     }

  lightboxRef.addEventListener('click', onOverlayClickToCloseModal);
    function onOverlayClickToCloseModal(e) {
    const lightboxOverlayClass = e.target.classList.contains('lightbox__overlay');

      if (lightboxOverlayClass) {
        lightboxRef.classList.remove('is-open');
        lightboxImgRef.src = '';
        lightboxImgRef.alt = '';
        window.removeEventListener('keydown', onBtnPressToScrollOrCloseModal);
    }
  }
}