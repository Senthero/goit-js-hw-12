// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = new SimpleLightbox('.gallery a');

export const renderMarkup = (list, container) => {
  const markup = list.map(image => {
    return `<li class="photo-card">
              <a class="gallery__item" href="${image.largeImageURL}">
                <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item"><b>Likes</b> ${image.likes}</p>
                <p class="info-item"><b>Views</b> ${image.views}</p>
                <p class="info-item"><b>Comments</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
              </div>
            </li>`;
  }).join('');
  
  container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
};