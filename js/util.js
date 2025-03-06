const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const verificationEnoughData = (block, value) => {
  if (value !== undefined) {
    return value;
  }
  block.remove();
};

export {
  debounce,
  verificationEnoughData
};
