# Keyframe

### A simple keyframe utility for custom animation.
[![npm version](https://badge.fury.io/js/keyframe.svg)](https://badge.fury.io/js/keyframe)
![](https://david-dm.org/brunnolou/keyframe.svg)
![](https://img.shields.io/github/size/brunnolou/keyframe/lib/index.min.js.svg)

## Install
`npm install --save keyframe`

or

`yarn add keyframe`

## Usage
Pass an object witch every key is the keyframe from `0` to `100`.

Each keyframe is a function that will be called every time during the keyframe interval.

And will return a function, **cacheable** that **runs only once** when the value is the same, to run through the keyframes progress.

```js
const run = keyframe({
  50: (d) => update(d),
  100: (d) => update(d),
});

run(0);    // 0
run(0.25); // 0.5
run(0.5);  // 1
run(0.75); // 0.5
run(1);    // 1
```

## Example
```js
import keyframe from 'keyframe';

...

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

// Return range between 0 and 1.
DOMslider.addEventListener('input', () => onSliderUpdate(slider.value / 100), true);

```

Check the `example/` folder to see a full example.

![](https://i.giphy.com/3og0IDzUJgxSBkwCbu.gif)


## Development
`yarn install`

`yarn run dev`

## Test
`yarn test`
