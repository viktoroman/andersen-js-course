const parseJSON = (jsonStr, successCb, failureCb) => {
  try {
    successCb(JSON.parse(jsonStr));
  } catch (error) {
    failureCb(error);
  }
};

const successCb = obj => {
  console.log('Success parse!');
  console.log(obj);
};

const failureCb = err => {
  console.log('Failure parse!');
  console.log(err);
};

export { parseJSON, successCb, failureCb };
