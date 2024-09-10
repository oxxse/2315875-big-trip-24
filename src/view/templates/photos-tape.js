function createPhoto(picture) {
  return (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  );
}

export function createPhotosTape(pictures) {
  return (
    `<div class="event__photos-tape">
      ${pictures.map((picture) => createPhoto(picture)).join('')}
    </div>`
  );
}
