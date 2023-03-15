export default function handleGalleryCreation(data) {
  return data.hits.reduce((str, item) => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = item;
    str += `<a class="gallery__link" href="${largeImageURL}" >
    <div class="photo-card">
    <img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b> Downloads</b>
      ${downloads}
    </p>
  </div>
</div></a>`;
    return str;
  }, '');
}
