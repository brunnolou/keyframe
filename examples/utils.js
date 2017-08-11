//
// DOM utilities to simplify examples.
//

export const createElement = tag => document.createElement(tag);

export const addElement = element => document.getElementById('root').appendChild(element);

export const addClass = className => (element) => {
  element.className = className;

  return element;
};

export const addDiv = className => addElement(addClass(className)(createElement('div')));

// CreateElement a slider element.
export function addSlider() {
  const slider = createElement('input');
  slider.type = 'range';
  slider.value = 100;
  addElement(slider);

  return slider;
}
