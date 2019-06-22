const Helper = (() => {
  // allow drop into container
  function helperAllowDrop(ev) {
    ev.preventDefault();
  }

  // keep id of draggable element during dragging
  function helperDragEntity(ev, transferDataType) {
    ev.dataTransfer.setData(transferDataType, ev.target.id);
  }

  // append draggable element into container at the moment of dropping element
  function helperDropEntity(ev, draggedElemId, parentElem) {
    ev.preventDefault();

    const entity = document.getElementById(draggedElemId);
    if (!(entity && parentElem)) return;
    parentElem.appendChild(entity);
  }

  // get properties for creating entity element
  function helperGetEntityElementProperties(
    entityId,
    entityName,
    className,
    handlerDragstart,
    handlerMousedown
  ) {
    return {
      tag: 'div',
      attributes: {
        id: entityId,
        class: className,
        draggable: true,
      },
      textContent: entityName,
      handles: {
        dragstart: handlerDragstart,
        mousedown: handlerMousedown,
      },
    };
  }

  // create new html-element with the help of properties
  function helperCreateEntityElement(props) {
    if (!(props && props.tag)) return undefined;
    const element = document.createElement(props.tag);
    element.textContent = props.textContent;

    Object.keys(props.attributes).forEach(attrName =>
      element.setAttribute(attrName, props.attributes[attrName])
    );

    Object.keys(props.handles).forEach(handleName =>
      element.addEventListener(handleName, props.handles[handleName])
    );

    return element;
  }

  // short time format
  function helperTimeNow() {
    const d = new Date();
    const addZero = v => (v < 10 ? '0' : '') + v;

    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    const s = addZero(d.getSeconds());
    return `${h}:${m}:${s}`;
  }

  // First letter to UPPER case
  function helperNameFormat(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  }

  return {
    allowDrop: helperAllowDrop,
    dragEntity: helperDragEntity,
    dropEntity: helperDropEntity,
    getEntityElementProperties: helperGetEntityElementProperties,
    createEntityElement: helperCreateEntityElement,
    timeNow: helperTimeNow,
    nameFormat: helperNameFormat,
  };
})();

export default Helper;
