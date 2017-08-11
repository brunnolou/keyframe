import './style.css';
import keyframe from '../../src/';
import { addDiv, addSlider } from '../utils';

const scale = (element, x) => {
  element.style.transform = `scaleX(${x})`;
};

// CreateElement DOM div elements.
const div = [addDiv('bar'), addDiv('bar'), addDiv('bar'), addDiv('bar')];

const onSliderUpdate = keyframe({
  // `d` is the duration between this and the previous frame.
  25: d => scale(div[0], d),
  50: d => scale(div[1], d),
  75: d => scale(div[2], d),
  100: d => scale(div[3], d),
});

const slider = addSlider();

// Return range between 0 and 1.
slider.addEventListener('input', () => onSliderUpdate(slider.value / 100), true);
