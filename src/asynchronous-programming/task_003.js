const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(100);
    }, ms);
  });
};

export default delay;
