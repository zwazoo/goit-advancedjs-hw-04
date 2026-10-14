import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  loader: document.querySelector('.loader'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img
                            class="gallery-image"
                            src="${webformatURL}"
                            alt="${tags}"
                        />
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${downloads}
                        </p>
                    </div>
                </li>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add('show');
}

export function hideLoader() {
  refs.loader.classList.remove('show');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.add('show');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('show');
}
