import items from './app.js';

const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
    'button[data-action="close-lightbox"]',
);

const lightboxContentRef = document.querySelector('.lightbox__content');
const createGalleryRef = item => {
    const galleryItemRef = document.createElement('li');
    galleryItemRef.classList.add('gallery__item');

    const galleryLinkref = document.createElement('a');
    galleryLinkref.classList.add('gallery__link');
    galleryLinkref.setAttribute('href', item.original);

    const galleryImgRef = document.createElement('img');
    galleryImgRef.classList.add('gallery__image');
    galleryImgRef.setAttribute('src', item.preview);
    galleryImgRef.setAttribute('data-source', item.original);
    galleryImgRef.setAttribute('alt', item.description);

    galleryLinkref.appendChild(galleryImgRef);
    galleryItemRef.appendChild(galleryLinkref);
    galleryRef.appendChild(galleryItemRef);

    return galleryItemRef;
};

const galleryItems = items.map(item => createGalleryRef(item));

galleryRef.append(...galleryItems);
galleryRef.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
lightboxContentRef.addEventListener('click', onOverlayClick);

galleryRef.addEventListener('keydown', onArrowRight);
galleryRef.addEventListener('keydown', onArrowLeft);

function onArrowRight(event) {
    if (event.code === 'ArrowRight') {
        onRightNext();
    };
};
function onArrowLeft(event) {
    if (event.code === 'ArrowLeft') {
        onLeftNext();
    };
};
function onOverlayClick(event) {
    if (event.target === event.currentTarget) {
        onCloseModal();
    };
};
function onPressEsc(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    };
};
function onRightNext() {
    const activeImage = items.findIndex(
        img => img.original === lightboxImageRef.src,
    );

    let index = activeImage ? activeImage : 0;

    if (index < items.length - 1) {
        index += 1;
    } else {
        index = 0;
    };

    lightboxImageRef.src = items[index].original;
    lightboxImageRef.alt = items[index].alt;
};

function onLeftNext() {
    const activeImage = items.findIndex(
        img => img.original === lightboxImageRef.src,
    );
    let index = activeImage ? activeImage : items.length - 1;
    if (index > 0) {
        index -= 1;
    } else {
        index = items.length - 1;
    };
    lightboxImageRef.src = items[index].original;
    lightboxImageRef.alt = items[index].alt;
};

function onOpenModal(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
        return;
    };
    window.addEventListener('keydown', onPressEsc);
    lightBoxRef.classList.add('is-open');
    lightboxImageRef.src = event.target.getAttribute('data-source');
    lightboxImageRef.alt = event.target.alt;
};

function onCloseModal() {
    window.removeEventListener('keydown', onPressEsc);
    lightBoxRef.classList.remove('is-open');
    lightboxImageRef.src = '';
    lightboxImageRef.alt = '';
};
