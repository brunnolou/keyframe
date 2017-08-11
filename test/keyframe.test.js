import keyframe from '../src';

const range = (start, end) => Array(end - start + 1).fill().map((_, i) => start + i);

test('Given range between 0 and 1000 should call each frame', () => {
  const calls = [];

  const frames = {
    100: d => calls.push(d),
  };

  const run = keyframe(frames);

  range(0, 1000).forEach((frame) => {
    run(frame / 1000);
  });

  expect(calls).toMatchSnapshot();
});

test('Given range between 0 and 10 should call each frame', () => {
  const calls = [];

  const frames = {
    50: d => calls.push(`50: ${d}`),
    100: d => calls.push(`100: ${d}`),
  };

  const run = keyframe(frames);

  range(0, 10).forEach((frame) => {
    run(frame / 10);
  });

  expect(calls).toMatchSnapshot();
});

test('Given keyframe 0 should call correct 1', () => {
  // When 0 is present considered it done like the initial state similar to css keyframes.
  const onEnterFrame = jest.fn();

  const run = keyframe({
    0: onEnterFrame,
  });

  run(0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(1);
});

test('Given 1 keyframe when zero is missing should call correct relative duration', () => {
  const onEnterFrame = jest.fn();

  keyframe({ 20: onEnterFrame })(0.1);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5);

  keyframe({ 50: onEnterFrame })(0.25);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5);

  keyframe({ 100: onEnterFrame })(0.25);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.25);
});

test('Given 1 keyframe when zero is missing should call 0', () => {
  let onEnterFrame = jest.fn();

  keyframe({ 20: onEnterFrame })(0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0);

  onEnterFrame = jest.fn();
  keyframe({ 50: onEnterFrame })(0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0);

  onEnterFrame = jest.fn();
  keyframe({ 100: onEnterFrame })(0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0);
});

test('Given 2 keyframes should call correct relative duration', () => {
  const onEnterFrame = jest.fn();

  keyframe({
    50: () => {},
    100: onEnterFrame,
  })(0.75);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5);

  keyframe({
    25: () => {},
    75: onEnterFrame,
  })(0.5);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5);
});

test('Given multiple keyframes should call each correct relative duration', () => {
  const onEnterFrame1 = jest.fn();
  const onEnterFrame2 = jest.fn();
  const onEnterFrame3 = jest.fn();
  const onEnterFrame4 = jest.fn();

  const run = keyframe({
    0: onEnterFrame1,
    50: onEnterFrame2,
    80: onEnterFrame3,
    100: onEnterFrame4,
  });

  // Frame 0.
  run(0);
  expect(onEnterFrame1).toHaveBeenLastCalledWith(1);

  // Frame 50.
  run(0.25);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(0.5);

  run(0.5);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(1);

  // Frame 80.
  run(0.6);
  expect(onEnterFrame3).toHaveBeenLastCalledWith(1 / 3);

  // Frame 100.
  run(0.9);
  expect(onEnterFrame4).toHaveBeenLastCalledWith(0.5);
});

test('When a exact frame is called it should call his own fn with progress at 100%', () => {
  const onStart = jest.fn();
  const onMiddle = jest.fn();
  const onEnd = jest.fn();

  const run = keyframe({
    0: onStart,
    50: onMiddle,
    100: onEnd,
  });

  // Frame 0.
  run(0);
  expect(onStart).toHaveBeenLastCalledWith(1);

  // Frame 50.
  run(0.5);
  expect(onMiddle).toHaveBeenLastCalledWith(1);

  run(1);
  expect(onEnd).toHaveBeenLastCalledWith(1);
});

test('Given multiple keyframes should call each correct relative duration', () => {
  const onEnterFrame1 = jest.fn();
  const onEnterFrame2 = jest.fn();
  const onEnterFrame3 = jest.fn();
  const onEnterFrame4 = jest.fn();

  const run = keyframe({
    0: onEnterFrame1,
    50: onEnterFrame2,
    80: onEnterFrame3,
    100: onEnterFrame4,
  });

  // Frame 0.
  run(0);
  expect(onEnterFrame1).toHaveBeenLastCalledWith(1);

  // Frame 50.
  run(0.25);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(0.5);

  run(0.5);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(1);

  // Frame 80.
  run(0.6);
  expect(onEnterFrame3).toHaveBeenLastCalledWith(1 / 3);

  // Frame 100.
  run(0.9);
  expect(onEnterFrame4).toHaveBeenLastCalledWith(0.5);
});

test('Given 0 should call next frame with 0', () => {
  const onEnterFrame0 = jest.fn();
  const onEnterFrame1 = jest.fn();
  const onEnterFrame2 = jest.fn();
  const onEnterFrame3 = jest.fn();

  const run = keyframe({
    0: onEnterFrame0,
    50: onEnterFrame1,
    80: onEnterFrame2,
    100: onEnterFrame3,
  });

  // Frame 0.
  run(0);
  expect(onEnterFrame0).toHaveBeenLastCalledWith(1);
  expect(onEnterFrame1).toHaveBeenLastCalledWith(0);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(0);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(0);
  expect(onEnterFrame3).toHaveBeenLastCalledWith(0);
});

test('Given 1 should call next frame with 1', () => {
  const onEnterFrame1 = jest.fn();
  const onEnterFrame2 = jest.fn();
  const onEnterFrame3 = jest.fn();

  const run = keyframe({
    50: onEnterFrame1,
    80: onEnterFrame2,
    100: onEnterFrame3,
  });

  // Frame 100.
  run(1);
  expect(onEnterFrame1).toHaveBeenLastCalledWith(1);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(1);
  expect(onEnterFrame2).toHaveBeenLastCalledWith(1);
  expect(onEnterFrame3).toHaveBeenLastCalledWith(1);
});

test('Given multiple zeros should call each function only once', () => {
  const onEnterFrame0 = jest.fn();
  const onEnterFrame1 = jest.fn();
  const onEnterFrame2 = jest.fn();
  const onEnterFrame3 = jest.fn();

  const run = keyframe({
    0: onEnterFrame0,
    50: onEnterFrame1,
    80: onEnterFrame2,
    100: onEnterFrame3,
  });

  // Frame 0.
  run(0);
  run(0);
  run(0);
  run(0);
  expect(onEnterFrame0).toHaveBeenCalledTimes(1);
  expect(onEnterFrame1).toHaveBeenCalledTimes(1);
  expect(onEnterFrame2).toHaveBeenCalledTimes(1);
  expect(onEnterFrame2).toHaveBeenCalledTimes(1);
  expect(onEnterFrame3).toHaveBeenCalledTimes(1);
});

test('Given multiple ones should call each function only once', () => {
  const onEnterFrame0 = jest.fn();
  const onEnterFrame1 = jest.fn();
  const onEnterFrame2 = jest.fn();
  const onEnterFrame3 = jest.fn();

  const run = keyframe({
    0: onEnterFrame0,
    50: onEnterFrame1,
    80: onEnterFrame2,
    100: onEnterFrame3,
  });

  // Frame 100.
  run(1);
  run(1);
  run(1);
  run(1);
  expect(onEnterFrame0).toHaveBeenCalledTimes(1);
  expect(onEnterFrame1).toHaveBeenCalledTimes(1);
  expect(onEnterFrame2).toHaveBeenCalledTimes(1);
  expect(onEnterFrame2).toHaveBeenCalledTimes(1);
  expect(onEnterFrame3).toHaveBeenCalledTimes(1);
});
