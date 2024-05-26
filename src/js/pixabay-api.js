import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43896740-362a21d10e9d41ec216c05f15';

export const fetchImages = async (searchValue, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return response.data;
};