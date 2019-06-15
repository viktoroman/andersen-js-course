class EntityStorage {
  constructor(...entities) {
    this.storage = new Map();

    this.add(...entities);
  }

  add(...entities) {
    if (!entities) return;
    entities.filter(value => Boolean(value));
    if (entities.length === 0) return;

    entities.forEach(entity => this.storage.set(entity.getId(), entity));
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
