const foo = (x, cb) => {
  if (x <= 10) {
    console.log('x <= 10');
    return;
  }
  console.log('x > 10');
  cb();
};

const createCb = str => {
  return () => {
    console.log(str);
  };
};

export { foo, createCb };
