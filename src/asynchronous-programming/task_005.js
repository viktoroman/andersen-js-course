const urls = [
  `http://www.json-generator.com/api/json/get/cevhxOsZnS`,
  `http://www.json-generator.com/api/json/get/cguaPsRxAi`,
  `http://www.json-generator.com/api/json/get/cfDZdmxnDm`,
  `http://www.json-generator.com/api/json/get/cfkrfOjrfS`,
  `http://www.json-generator.com/api/json/get/ceQMMKpidK`,
];

const getData = url => {
  return fetch(url).then(resp => resp.json());
};

const getDataAll = () => {
  Promise.all(urls.map(url => getData(url))).then(console.log);
};

export default getDataAll;
