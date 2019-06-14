class EntityStorage {
  constructor(...entities) {
    this.storage = new Map();

    this.add(...entities);
  }

  add(...entities) {
    entities.filter(value => Boolean(value));
    if (entities.length === 0) return;

    this.storage.add(...entities);
  }

  // return true/false
  deleteById(entityId) {
    return this.storage.delete(entityId);
  }

  // return true/false
  delete(entity) {
    return this.deleteById(entity.getId());
  }

  find(entity) {
    const entityId = entity.getId();
    if (!entityId) return entityId;

    return this.storage.get(entityId);
  }
}

export default EntityStorage;
