import keyframe from '../../src/';
import { addDiv, addSlider } from '../utils';

// Create a DOM div element.
const div = addDiv();
div.innerHTML = 'DEMO';

// Utility to move the div.
const moveTo = (x, y) => {
  div.style.transform = `translate(${x}px, ${y}px)`;
};

// From (0% -> 50%) move the div left 150px
// then from (50% -> 100%) move the div up 50px.
const onSliderUpdate = keyframe({
  // d is the duration between 0% -> 50%.
  50: d => moveTo(d * 150, 0),

  // d is the duration between 50% -> 100%.
  100: d => moveTo(150, d * -50),
});

onSliderUpdate(1);

const slider = addSlider();

// Return range between 0 and 1.
slider.addEventListener('input', () => onSliderUpdate(slider.value / 100), true);
