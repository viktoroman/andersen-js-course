const urlsTask005 = [
  `http://www.json-generator.com/api/json/get/cevhxOsZnS`,
  `http://www.json-generator.com/api/json/get/cguaPsRxAi`,
  `http://www.json-generator.com/api/json/get/cfDZdmxnDm`,
  `http://www.json-generator.com/api/json/get/cfkrfOjrfS`,
  `http://www.json-generator.com/api/json/get/ceQMMKpidK`,
];

const getData = url => {
  return fetch(url).then(resp => resp.json());
};

const getDataAllParallel = urls => {
  Promise.all(urls.map(url => getData(url))).then(console.log);
};

const getDataAllSequentail = urls => {
  const res = [];

  urls
    .map(url => getData(url))
    .reduce((prevProm, currProm) => {
      return prevProm.then(data => {
        if (data) {
          res.push(data);
        }
        return currProm;
      });
    }, Promise.resolve())
    .then(data => {
      res.push(data);
      console.log(res);
    });
};

export { urlsTask005, getDataAllParallel, getDataAllSequentail };
