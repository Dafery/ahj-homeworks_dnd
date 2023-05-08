/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/utils.js
function createElementFromHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}
;// CONCATENATED MODULE: ./src/js/Card.js

class Card {
  constructor(key, text) {
    this.key = key;
    this.text = text;
  }
  static getListItemsByEl(el) {
    return [...el.querySelectorAll('.dashboard-col__list-item:not(.dragged)')];
  }
  static getDeleteItemBtnByEl(el) {
    return el.querySelector('.dashboard-col__list-item__btn-delete');
  }
  getDashboardColListItem() {
    return createElementFromHTML(`<li class="dashboard-col__list-item" key="${this.key}" data-value="${this.text}">
        <button class="dashboard-col__list-item__btn-delete">✕</button>
      </li>`);
  }
}
;// CONCATENATED MODULE: ./src/js/consts.js
const dashboardTitles = {
  todo: 'Todo',
  inProgress: 'In progress',
  done: 'Done'
};
;// CONCATENATED MODULE: ./src/js/Column.js


class Column {
  constructor(id) {
    this.id = id;
    this.title = dashboardTitles[id];
  }
  static getColsByEl(el) {
    return el.querySelectorAll('.dashboard-col');
  }
  static getColListByEl(el) {
    return el.querySelector('.dashboard-col__list');
  }
  static getColBtnAnotherCardByEl(el) {
    return el.querySelector('.dashboard-col__btn-add-another-card');
  }
  static getColTextareaByEl(el) {
    return el.querySelector('.dashboard-col__textarea');
  }
  static getColBtnAddCardByEl(el) {
    return el.querySelector('.dashboard-col__btn-add-card');
  }
  static getColBtnCloseByEl(el) {
    return el.querySelector('.dashboard-col__btn-close');
  }
  getDashboardCol() {
    return createElementFromHTML(`<section class="dashboard-col">
        <h2 class="dashboard-col__title">${this.title}</h2>
        <ul class="dashboard-col__list" id="${this.id}"></ul>
        <button class="dashboard-col__btn-add-another-card">+ Add another card</button>
        <textarea class="dashboard-col__textarea" placeholder="Enter a title for this card..." hidden></textarea>
        <button class="dashboard-col__btn-add-card" hidden>Add card</button>
        <button class="dashboard-col__btn-close" hidden>✕</button>
      </section>`);
  }
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./src/js/Store.js

class Store {
  constructor(state) {
    this.state = state || {
      todo: [],
      inProgress: [],
      done: []
    };
  }
  addItem(id, text) {
    const key = esm_browser_v4();
    this.state[id].push({
      key,
      text
    });
    localStorage.setItem('state', JSON.stringify(this.state));
    return key;
  }
  deleteItem(id, key) {
    this.state[id] = this.state[id].filter(item => item.key !== key);
    localStorage.setItem('state', JSON.stringify(this.state));
  }
  insertItem(id, items) {
    this.state[id] = items.map(item => ({
      key: item.getAttribute('key'),
      text: item.dataset.value
    }));
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}
;// CONCATENATED MODULE: ./src/js/Controller.js




class Controller {
  constructor(container) {
    this.container = container;
    this.store = new Store(JSON.parse(localStorage.getItem('state')));
  }
  init = () => {
    for (const id in dashboardTitles) {
      const column = new Column(id);
      const dashboardCol = column.getDashboardCol();
      this.container.append(dashboardCol);
      const dashboardColList = Column.getColListByEl(dashboardCol);
      this.store.state[id].forEach(item => {
        const card = new Card(item.key, item.text);
        const addedItem = card.getDashboardColListItem();
        addedItem.addEventListener('mousedown', this.onMouseDown);
        const deleteItemBtn = Card.getDeleteItemBtnByEl(addedItem);
        deleteItemBtn.addEventListener('click', this.onDeleteItem);
        dashboardColList.append(addedItem);
      });
    }
    const dashboardCols = Column.getColsByEl(this.container);
    dashboardCols.forEach(col => {
      const dashboardColList = Column.getColListByEl(col);
      const dashboardColBtnAddAnotherCard = Column.getColBtnAnotherCardByEl(col);
      const dashboardColTextarea = Column.getColTextareaByEl(col);
      const dashboardColBtnAddCard = Column.getColBtnAddCardByEl(col);
      const dashboardColBtnClose = Column.getColBtnCloseByEl(col);
      dashboardColBtnAddAnotherCard.addEventListener('click', () => {
        dashboardColBtnAddAnotherCard.hidden = true;
        dashboardColTextarea.hidden = false;
        dashboardColBtnAddCard.hidden = false;
        dashboardColBtnClose.hidden = false;
        dashboardColTextarea.value = '';
      });
      dashboardColBtnAddCard.addEventListener('click', () => {
        if (!dashboardColTextarea.value) {
          return;
        }
        const itemKey = this.store.addItem(dashboardColList.id, dashboardColTextarea.value);
        dashboardColBtnAddAnotherCard.hidden = false;
        dashboardColTextarea.hidden = true;
        dashboardColBtnAddCard.hidden = true;
        dashboardColBtnClose.hidden = true;
        const card = new Card(itemKey, dashboardColTextarea.value);
        const addedItem = card.getDashboardColListItem();
        addedItem.addEventListener('mousedown', this.onMouseDown);
        const deleteItemBtn = Card.getDeleteItemBtnByEl(addedItem);
        deleteItemBtn.addEventListener('click', this.onDeleteItem);
        dashboardColList.append(addedItem);
      });
      dashboardColBtnClose.addEventListener('click', () => {
        dashboardColBtnAddAnotherCard.hidden = false;
        dashboardColTextarea.hidden = true;
        dashboardColBtnAddCard.hidden = true;
        dashboardColBtnClose.hidden = true;
      });
    });
  };
  onDeleteItem = e => {
    const colList = e.target.closest('ul');
    const colListItem = e.target.closest('li');
    this.store.deleteItem(colList.id, colListItem.getAttribute('key'));
    colListItem.remove();
  };
  onMouseMove = e => {
    this.actualElement.style.left = e.clientX - this.actualElementX + 'px';
    this.actualElement.style.top = e.clientY - this.actualElementY + 'px';
    if (!document.elementFromPoint(e.clientX, e.clientY)) {
      this.actualElement.removeAttribute('style');
      this.actualElement.classList.remove('dragged');
      document.body.style.cursor = 'auto';
      document.documentElement.removeEventListener('mousemove', this.onMouseMove);
      document.documentElement.removeEventListener('mouseup', this.onMouseUp);
    }
    const closestList = e.target.closest('ul');
    this.listItems = closestList ? Card.getListItemsByEl(closestList) : undefined;
    if (e.target.tagName === 'UL') {
      return e.layerY < e.target.offsetHeight / 2 ? e.target.prepend(this.shadowElement) : e.target.append(this.shadowElement);
    }
    if (e.target.tagName === 'LI') {
      return e.layerY < e.target.offsetHeight / 2 ? e.target.before(this.shadowElement) : e.target.after(this.shadowElement);
    }
    this.shadowElement.remove();
  };
  onMouseDown = e => {
    e.preventDefault();
    if (e.target.tagName !== 'LI') {
      return;
    }
    this.actualElementX = e.layerX;
    this.actualElementY = e.layerY;
    this.actualElement = e.target;
    this.shadowElement = this.actualElement.cloneNode(true);
    this.actualElement.style.height = this.actualElement.offsetHeight + 'px';
    this.actualElement.style.width = this.actualElement.offsetWidth + 'px';
    this.actualElement.classList.add('dragged');
    this.shadowElement.classList.add('shaded');
    this.prevId = this.actualElement.closest('ul').getAttribute('id');
    this.prevKey = this.actualElement.getAttribute('key');
    document.body.style.cursor = 'grabbing';
    document.documentElement.addEventListener('mousemove', this.onMouseMove);
    document.documentElement.addEventListener('mouseup', this.onMouseUp);
  };
  onMouseUp = e => {
    this.actualElement.removeAttribute('style');
    this.actualElement.classList.remove('dragged');
    document.body.style.cursor = 'auto';
    document.documentElement.removeEventListener('mousemove', this.onMouseMove);
    document.documentElement.removeEventListener('mouseup', this.onMouseUp);
    const closestList = e.target.closest('ul');
    if (closestList && this.listItems) {
      this.store.deleteItem(this.prevId, this.prevKey);
      this.store.insertItem(closestList.id, this.listItems);
      this.shadowElement.replaceWith(this.actualElement);
    }
    this.actualElement = undefined;
  };
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector('.container');
const controller = new Controller(container);
controller.init();
;// CONCATENATED MODULE: ./src/index.js


// TODO: write your code in app.js
/******/ })()
;