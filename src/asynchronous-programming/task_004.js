const URL_ACCESS = `http://www.json-generator.com/api/json/get/cfQCylRjuG`;
const URL_DATA = `http://www.json-generator.com/api/json/get/cfVGucaXPC`;

const getData = () => {
  fetch(URL_ACCESS)
    .then(response => response.json()) // get promise to get body of response
    .then(({ getUsersData: isAvailable }) => {
      // reject
      if (!isAvailable) {
        return Promise.reject(new Error(`Access data status: ${isAvailable}`));
      }
      return fetch(URL_DATA);
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Received data:`);
      console.log(data);
    })
    .catch(console.log);
};

export default getData;
