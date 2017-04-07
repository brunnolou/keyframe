import keyframe from '../';

const range = (start, end) => Array(end - start + 1).fill().map((_, i) => start + i);

test('Given range between 0 and 1000 should call each frame', () => {
  const calls = [];

  const frames = {
    100: (d) => calls.push(d),
  };

  range(0, 1000).map((frame) => {
    keyframe(frames, frame / 1000);
  });

  expect(calls).toMatchSnapshot()
});

test('Given range between 0 and 10 should call each frame', () => {
  const calls = [];

  const frames = {
    50: (d) => calls.push(`50: ${d}`),
    100: (d) => calls.push(`100: ${d}`),
  };

  range(0, 10).map((frame) => {
    keyframe(frames, frame / 10);
  });

  expect(calls).toMatchSnapshot()
})

test('Given keyframe 0 should call correct 1', () => {
  let onEnterFrame = jest.fn();

  keyframe({
    0: onEnterFrame,
  }, 0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(1, 0);
});

test('Given 1 keyframe when zero is missing should call correct relative duration', () => {
  let onEnterFrame = jest.fn();

  keyframe({
    20: onEnterFrame,
  }, 0.1);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5, 0.1);

  keyframe({
    50: onEnterFrame,
  }, 0.25);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5, 0.25);

  keyframe({
    100: onEnterFrame,
  }, 0.25);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.25, 0.25);
});

test('Given 1 keyframe when zero is missing should call 0', () => {
  let onEnterFrame = jest.fn();

  keyframe({
    20: onEnterFrame,
  }, 0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0, 0);

  onEnterFrame = jest.fn();
  keyframe({
    50: onEnterFrame,
  }, 0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0, 0);

  onEnterFrame = jest.fn();
  keyframe({
    100: onEnterFrame,
  }, 0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0, 0);
});

test('Given 2 keyframes should call correct relative duration', () => {
  let onEnterFrame = jest.fn();

  keyframe({
    50: () => {},
    100: onEnterFrame,
  }, 0.75);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5, 0.75);

  keyframe({
    25: () => {},
    75: onEnterFrame,
  }, 0.5);
  expect(onEnterFrame).toHaveBeenLastCalledWith(0.5, 0.5);
});

test('Given multiple keyframes should call correct relative duration', () => {
  const onEnterFrame = jest.fn();

  const frames = {
    0: onEnterFrame,
    50: onEnterFrame,
    80: onEnterFrame,
    100: onEnterFrame,
  };

  // Frame 0.
  keyframe(frames, 0);
  expect(onEnterFrame).toHaveBeenLastCalledWith(1, 0);

  // Frame 50.
  keyframe(frames, 0.25);
  expect(onEnterFrame).toHaveBeenLastCalledWith(.5, 0.25);

  keyframe(frames, 0.5);
  expect(onEnterFrame).toHaveBeenLastCalledWith(1, 0.5);

  // Frame 80.
  keyframe(frames, 0.6);
  expect(onEnterFrame).toHaveBeenLastCalledWith(1/3, 0.6);

  // Frame 100.
  keyframe(frames, .9);
  expect(onEnterFrame).toHaveBeenLastCalledWith(.5, .9);
});

test('When a exact frame is called it should call his own fn with progress at 100%', () => {
  const onStart = jest.fn();
  const onMiddle = jest.fn();
  const onEnd = jest.fn();

  const frames = {
    0: onStart,
    50: onMiddle,
    100: onEnd,
  };

  // Frame 0.
  keyframe(frames, 0);
  expect(onStart).toHaveBeenLastCalledWith(1, 0);

  // Frame 50.
  keyframe(frames, 0.5);
  expect(onMiddle).toHaveBeenLastCalledWith(1, 0.5);

  keyframe(frames, 1);
  expect(onEnd).toHaveBeenLastCalledWith(1, 1);
});

