// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from './js/pixabay-api.js';
import { renderMarkup } from './js/render-functions.js';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const userSearch = event.target.elements.search.value.trim();

  if (userSearch === '') {
    iziToast.error({
      title: '⨻',
      message: 'Please enter text to find something!',
      position: 'topRight',
    });
    return;
  }

  refs.loader.classList.remove('is-hidden');

  fetchImages(userSearch)
    .then(images => {
      refs.loader.classList.add('is-hidden');

      if (images.hits.length === 0) {
        iziToast.error({
          title: '⨻',
          message:'Sorry, there are no images your search query!',
          position: 'topRight',
        });
        return;
      }

      refs.form.search.value = '';
      refs.gallery.innerHTML = '';
      renderMarkup(images.hits, refs.gallery);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
       iziToast.error({
        title: '⨻',
        message:'An error occurred while fetching images.',
        position: 'topRight',
      });
      refs.loader.classList.add('is-hidden');
    });
});