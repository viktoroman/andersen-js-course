const CRUD = (() => {
  // get all
  const getAllCRUD = async url => {
    try {
      return await fetch(url).then(r => r.json());
    } catch (error) {
      throw new Error(error);
    }
  };

  // template for simple queries
  const templateCRUD = async ({ url, method, data }) => {
    try {
      return await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json());
    } catch (error) {
      throw new Error(error);
    }
  };

  // insert
  const insertCRUD = async (url, data) => {
    try {
      return await templateCRUD({ url, method: 'POST', data });
    } catch (error) {
      throw new Error(error);
    }
  };

  // update
  const updateCRUD = async (url, data) => {
    try {
      return await templateCRUD({ url, method: 'PUT', data });
    } catch (error) {
      throw new Error(error);
    }
  };

  // delete by id
  const deleteByIdCRUD = async (url, id) => {
    try {
      return await templateCRUD({
        url: `${url}/${id}`,
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  // final result
  return {
    getAll: getAllCRUD,
    insert: insertCRUD,
    update: updateCRUD,
    deleteById: deleteByIdCRUD,
  };
})();

export default CRUD;
