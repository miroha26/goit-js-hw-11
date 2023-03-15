import FetchInfo from './js/fetch';
import handleGalleryCreation from './js/img-templates';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  animationSpeed: 200,
  fadeSpeed: 150,
});

const newFetchInfo = new FetchInfo();
const numberOfResponses = newFetchInfo.numberOfResponses();

const btn = document.querySelector('.button');
const input = document.querySelector('input');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.button--accent');
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', handlePhotoSearch);
loadMoreBtn.addEventListener('click', handleMorePhotos);

function handlePhotoSearch(e) {
  e.preventDefault();

  newFetchInfo.query = input.value.trim();

  if (!newFetchInfo.query) {
    Notify.info('Enter a word in the search field');
    return;
  }
  loadMoreBtn.style.display = 'flex';

  gallery.innerHTML = '';
  newFetchInfo.resetSearch();

  newFetchInfo
    .fetchInfo()
    .then(res => {
      notifySearch(res);
      lightbox.refresh();
    })
    .catch(er => console.log(er));
}

function handleMorePhotos(e) {
  newFetchInfo.fetchInfo().then(res => {
    notifyLoadMore(res);
    gallery.insertAdjacentHTML('beforeend', handleGalleryCreation(res));
    lightbox.refresh();
    scroll();
  });
}

function notifySearch(data) {
  if (data.totalHits === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    gallery.innerHTML = handleGalleryCreation(data);
    lightbox.refresh();
  }
  if (data.totalHits > numberOfResponses) {
    loadMoreBtn.style.display = 'flex';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

function notifyLoadMore(data) {
  if (
    Math.ceil(data.totalHits / numberOfResponses) === newFetchInfo.currentPage()
  ) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.style.display = 'none';
  }
}
function scroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.4,
    behavior: 'smooth',
  });
}


