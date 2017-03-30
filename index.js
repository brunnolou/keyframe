function keyframe(frames, time) {
  if (time > 1) return 100;

  const timeKey = time * 100;
  const keys = Object.keys(frames).sort();

  const currentFrameKey = keys.filter((frame, index) => {
    const nextFrame = keys[index + 1] || 100;

    return timeKey > frame && timeKey <= nextFrame;
  }).pop();

  const nextFrameKey = keys.findIndex(x => x === currentFrameKey) + 1;
  const keyCallback = frames[currentFrameKey];

  if (nextFrameKey && keyCallback) {
    keyCallback((timeKey - currentFrameKey) / ((keys[nextFrameKey] || 100) - currentFrameKey));
  }

  return currentFrameKey || null;
}

module.exports = keyframe;
