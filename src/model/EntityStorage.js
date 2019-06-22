class EntityStorage {
  constructor() {
    this.storage = new Map();
  }

  // get all values
  getAll() {
    return [...this.storage.values()];
  }

  // add entity, return true/false
  add(entity) {
    if (!entity) return false;
    this.storage.set(entity.getId(), entity);
    return true;
  }

  // return true/false
  deleteById(entityId) {
    return this.storage.delete(entityId);
  }

  // delete by entity id, return true/false
  delete({ id: entityId }) {
    return this.deleteById(entityId);
  }

  // find by entity id, return entity
  findById(entityId) {
    if (!entityId) return undefined;
    return this.storage.get(entityId);
  }

  // find all entities with the same type, name
  findSame({ type: findEntityType, name: findEntityName }) {
    return [...this.storage.values()].reduce((accumArr, entity) => {
      if (findEntityType === entity.getType() && findEntityName === entity.getName()) {
        accumArr.push();
      }
      return accumArr;
    }, []);
  }

  // find all entities ONLY with the same type
  findSameType({ type: findEntityType }) {
    return [...this.storage.values()].reduce((accumArr, entity) => {
      if (findEntityType === entity.getType()) {
        accumArr.push();
      }
      return accumArr;
    }, []);
  }

  // size of entities storage
  size() {
    return this.storage.size();
  }

  // has entity with this id
  hasEntity(entity) {
    return this.find(entity.getId()) !== undefined;
  }

  // has entity with this type, name
  hasSameEntity({ type: findEntityType, name: findEntityName }) {
    return [...this.storage.values()].some(
      ({ type: entityType, name: entityName }) =>
        findEntityType === entityType && findEntityName === entityName
    );
  }
}

export default EntityStorage;
