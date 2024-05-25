const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43896740-362a21d10e9d41ec216c05f15';

export const fetchImages = searchValue => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${searchValue}&safesearch=true&per_page=20`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
};