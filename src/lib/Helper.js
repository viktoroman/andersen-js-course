const Helper = (() => {
  // remove all children of DOM element
  function removeChildrenHelper(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }

  // create simple DOM element with the help of properties
  function getSimpleElement(tag, attributes) {
    const element = document.createElement(tag);
    if (attributes) {
      Object.keys(attributes).forEach(attrName =>
        element.setAttribute(attrName, attributes[attrName])
      );
    }
    return element;
  }

  // DOM: create default user record
  function getDefaultUserRecordHelper(user, cbDelListener) {
    const {
      id: userId,
      firstName: userFirstName = '',
      lastName: userLastName = '',
      position: userPosition = '',
      dateChange: userDateChange = '', // new Date().toISOString(),
    } = user;

    // row
    const trElement = getSimpleElement('tr', { id: userId });

    // cells
    const tdElements = [
      { tag: 'td', attr: { class: 'first-name' }, text: userFirstName },
      { tag: 'td', attr: { class: 'last-name' }, text: userLastName },
      { tag: 'td', attr: { class: 'position' }, text: userPosition },
      { tag: 'td', attr: { class: 'changeDate' }, text: userDateChange },
    ].map(({ tag, attr, text }) => {
      const elem = getSimpleElement(tag, attr);
      elem.textContent = text;
      return elem;
    });

    // del button
    const btnElementDel = getSimpleElement('button', { type: 'button', class: 'btn btn-danger' });
    btnElementDel.textContent = 'DEL';
    btnElementDel.addEventListener('click', cbDelListener);

    // cell with del button
    const tdElementDel = getSimpleElement('td');
    tdElementDel.appendChild(btnElementDel);

    // add to child array
    tdElements.push(tdElementDel);

    // add cells to parent element-row
    return tdElements.reduce((parentElem, elem) => {
      parentElem.appendChild(elem);
      return parentElem;
    }, trElement);
  }

  // final set
  return {
    removeChildren: removeChildrenHelper,
    getDefaultUserRecord: getDefaultUserRecordHelper,
  };
})();

export default Helper;
