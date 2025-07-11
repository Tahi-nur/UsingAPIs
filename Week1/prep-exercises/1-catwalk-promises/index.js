'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const WALKING_CAT_URL =
  'http://www.anniemation.com/clip_art/images/cat-walk.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let currentPos = startPos;
    img.style.left = currentPos + 'px';

    const intervalId = setInterval(() => {
      currentPos += STEP_SIZE_PX;
      img.style.left = currentPos + 'px';

      if (currentPos >= stopPos) {
        clearInterval(intervalId);
        resolve();
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const originalSrc = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = WALKING_CAT_URL;
      resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');

  const loop = async () => {
    const startPos = -img.width;
    const centerPos = (window.innerWidth - img.width) / 2;
    const stopPos = window.innerWidth;

    img.style.left = startPos + 'px';

    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img, centerPos, stopPos);

    // Start the loop again
    loop();
  };

  loop();
}

window.addEventListener('load', catWalk);
