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
  loadMoreButton: document.querySelector('.load-more'),
};

let searchQuery = '';
let page = 1;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  searchQuery = event.target.elements.search.value.trim();
  page = 1;

  if (searchQuery === '') {
    iziToast.error({
      title: '⨻',
      message: 'Please enter text to find something!',
      position: 'topRight',
    });
    return;
  }

  refs.loader.classList.remove('is-hidden');
  refs.gallery.innerHTML = '';
  refs.loadMoreButton.classList.add('is-hidden');

  try {
    const images = await fetchImages(searchQuery, page);
    if (images.hits.length === 0) {
      iziToast.error({
        title: '⨻',
        message: 'Sorry, there are no images your search query!',
        position: 'topRight',
      });
      return;
    }

    renderMarkup(images.hits, refs.gallery);
    refs.loader.classList.add('is-hidden');
    if (images.hits.length >= 15) {
      refs.loadMoreButton.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: '⨻',
      message: 'An error occurred while fetching images.',
      position: 'topRight',
    });
    refs.loader.classList.add('is-hidden');
  }
}

async function onLoadMore() {
  page += 1;
  refs.loader.classList.remove('is-hidden');
  refs.loadMoreButton.classList.add('is-hidden');

  try {
    const images = await fetchImages(searchQuery, page);
    renderMarkup(images.hits, refs.gallery);
    refs.loader.classList.add('is-hidden');
    if (images.hits.length < 15) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      refs.loadMoreButton.classList.add('is-hidden');
    } else {
      refs.loadMoreButton.classList.remove('is-hidden');
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: '⨻',
      message: 'An error occurred while fetching images.',
      position: 'topRight',
    });
    refs.loader.classList.add('is-hidden');
  }
}