const getResolvedPromise = value => {
  return Promise.resolve(value);
};
const checkResolvedValue = value => {
  getResolvedPromise(value)
    .then(resValue => {
      if (resValue > 300) {
        throw new Error(`Check is failed! ${value} > 300!!`);
      }
      console.log(`All is well ${value} <= 300`);
    })
    .catch(err => console.log(err.message))
    .finally(() => console.log('This is Finally!'));
};

export default checkResolvedValue;
