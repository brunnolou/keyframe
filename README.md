# Keyframe

### A simple keyframe utility for custom animation.

## Install
`npm install Keyframe`

## Usage
The first parameter is an object witch every key is the keyframe.
Each keyframe is a function that will be called every time during the keyframe interval.
```js
  keyframe({
    50: (d) => update(d),
    100: (d) => update(d),
  }, progress);
```


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
    50: (d) => moveTo(d * 100, 0),

    // d is the duration between 50% -> 100%.
    100: (d) => moveTo(100, d * 100),
  }, progress);

  i++;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
```

Check the `src/` to see a full example.
![](https://i.giphy.com/3og0IDzUJgxSBkwCbu.gif)


## Development
`npm install`

`npm start`

## Test
`npm test`
