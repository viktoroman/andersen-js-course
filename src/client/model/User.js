class User {
  constructor(fields) {
    this.setFields(fields);
  }

  setFields({ _id, id, firstName, lastName, dateChange, position }) {
    this.id = id || _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateChange = dateChange;
    this.position = position;
  }

  updateFields(fields) {
    const existedFields = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      dateChange: this.dateChange,
      position: this.position,
    };

    Object.assign(existedFields, fields);
    this.setFields(existedFields);
  }
}

export default User;
