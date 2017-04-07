const sort = (a, b) => a > b;
const toFloat = x => parseFloat(x, 10);
const noop = () => {};

function keyframe(frames, time) {
  if (time > 1) return noop;

  const timeKey = time * 100;
  let keysNumber = Object.keys(frames).map(toFloat).sort(sort);

  if (frames[0] === undefined) {
    // When frame zero not defined call the next at position zero.
    frames[0] = frames[keysNumber[0]];
    if (time === 0) return frames[0](0, time);

    keysNumber = [0, ...keysNumber];
  } else {
    // When the frame zero exists call it with full progress.
    if (time === 0) return frames[0](1, time);
  }

  let currentFrameKey;
  let prevFrameKey;
  let progress = 0;

  keysNumber.forEach((frame, index) => {
    const nextFrame = keysNumber[index + 1];

    if (timeKey > frame && timeKey <= nextFrame) {
      currentFrameKey = nextFrame;
      prevFrameKey = frame;
    }
  });

  const keyCallback = frames[currentFrameKey];

  progress = ((timeKey - prevFrameKey) / (currentFrameKey - prevFrameKey));

  return keyCallback(progress, time);
}

module.exports = keyframe;
