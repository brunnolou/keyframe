import keyframe from '../';

// Create a div element.
const div = document.createElement('div');
div.innerHTML = 'DEMO';
document.documentElement.appendChild(div);

// Utility to move the div
moveTo = (x, y) => {
  div.style.transform = `translate(${x}px, ${y}px)`;
};

let i = 0;
let progress = 0;
const duration = 2 * 60;

function update() {
  progress = i / duration;

  // From (0% -> 50%) move the div left 100px
  // then from (50% -> 100%) move the div down 100px.
  keyframe({
    // d is the duration between 0% -> 50%.
    50: (d) => moveTo(d * 100, 0),

    // d is the duration between 50% -> 100%.
    100: (d) => moveTo(100, d * 100),
  }, progress);

  i++;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
