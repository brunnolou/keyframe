# Keyframe

### A simple keyframe utility for custom animation.

## Install
`npm install Keyframe`

## Usage
```js
import keyframe from '../';

...

let i = 0;
let progress = 0;
const duration = 2 * 60;

function update() {
  progress = i / duration;

  // From (0% -> 50%) move the div left 100px
  // then from (50% -> 100%) move the div down 100px.
  keyframe({
    // d is the duration between 0% -> 50%.
    0: (d) => moveTo(d * 100, 0),

    // d is the duration between 50% -> 100%.
    50: (d) => moveTo(100, d * 100),
  }, progress);

  i++;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
```

## Development
`npm install`

`npm start`
