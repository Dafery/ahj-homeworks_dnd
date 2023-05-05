import { v4 } from 'uuid';

export default class Store {
  constructor(state) {
    this.state = state || {
      todo: [],
      inProgress: [],
      done: [],
    };
  }

  addItem(id, text) {
    const key = v4();
    this.state[id].push({ key, text });
    localStorage.setItem('state', JSON.stringify(this.state));
    return key;
  }

  deleteItem(id, key) {
    this.state[id] = this.state[id].filter((item) => item.key !== key);
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  insertItem(id, items) {
    this.state[id] = items.map((item) => ({ key: item.getAttribute('key'), text: item.dataset.value }));
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}
