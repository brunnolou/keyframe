const sort = (a, b) => a - b;
const toFloat = x => parseFloat(x, 10);
const noop = () => {};
const chunk2 = (value) => {
  const arr = [];
  for (let i = 0; i < value.length; i += 2) arr.push(value.slice(i, i + 2));

  return arr;
};

const onceDifferent = (func, value) => {
  let memo = value;

  return (newVal) => {
    if (memo === newVal) return memo;

    func(newVal);

    memo = newVal;

    return memo;
  };
};

// From popmotion's calc.
const getProgressFromValue = (from, to, value) => (value - from) / (to - from);
const getValueFromProgress = (from, to, progress) => -progress * from + progress * to + from;

/**
 * popmotion's Interpolate from set of values to another
 */
const interpolate = (input, output, rangeEasing) => {
  const rangeLength = input.length;
  const finalIndex = rangeLength - 1;

  return (v) => {
    // If value outside minimum range, quickly return
    if (v <= input[0]) {
      return output[0];
    }

    // If value outside maximum range, quickly return
    if (v >= input[finalIndex]) {
      return output[finalIndex];
    }

    let i = 1;

    // Find index of range start
    for (; i < rangeLength; i++) {
      if (input[i] > v || i === finalIndex) {
        break;
      }
    }

    const progressInRange = getProgressFromValue(input[i - 1], input[i], v);
    const easedProgress = rangeEasing ? rangeEasing[i - 1](progressInRange) : progressInRange;
    return getValueFromProgress(output[i - 1], output[i], easedProgress);
  };
};

/**
 * keyframes
 * @param {Object} frames
 * @return {Function}
 */
export default function keyframes(originalFrames) {
  const frames = Object.assign({}, originalFrames);

  if (!frames[0]) frames[0] = noop;

  Object.keys(frames).forEach((key) => {
    const func = frames[key];

    frames[key] = onceDifferent(func);
  });

  let keysNumbers = Object.keys(frames).map(toFloat);

  keysNumbers = [...keysNumbers, ...keysNumbers].sort(sort).slice(1, Infinity);

  const chucks = chunk2(keysNumbers);

  const caller = (progress) => {
    const x = interpolate([0, 1], [0, 100])(progress);

    // When 0 is present considered it done like the initial state similar to css keyframes.
    frames[0](1);

    chucks.forEach((chunk) => {
      // Handle the last chunk [100] without and end;
      if (!chunk[1]) {
        return;
      }

      const func = frames[chunk[1]];
      const interpolatedValue = interpolate([chunk[0], chunk[1]], [0, 1]);

      func(interpolatedValue(x));
    });
  };

  return caller;
}
