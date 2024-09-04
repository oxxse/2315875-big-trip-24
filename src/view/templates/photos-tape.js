function createPhoto(photo) {
  return (
    `<img class="event__photo" src="img/photos/${photo}" alt="Event photo">`
  );
}

export function createPhotosTape(sources) {
  return (
    `<div class="event__photos-tape">
      ${sources.map((source) => createPhoto(source)).join('')}
    </div>`
  );
}
