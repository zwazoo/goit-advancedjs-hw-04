import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const { hits: images } = data;
    totalHits = data.totalHits;

    if (images.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(images);

      if (page * PER_PAGE < totalHits) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message || 'An error occurred while fetching images',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (page * PER_PAGE >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message || 'An error occurred while fetching images',
    });
  } finally {
    hideLoader();
  }
});
