class User {
  constructor({ _id, id, firstName, lastName, dateChange, position }) {
    this.id = _id || id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateChange = dateChange;
    this.position = position;
  }
}

export default User;
