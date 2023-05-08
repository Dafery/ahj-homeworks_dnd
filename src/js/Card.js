import { createElementFromHTML } from './utils';

export default class Card {
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
    return createElementFromHTML(
      `<li class="dashboard-col__list-item" key="${this.key}" data-value="${this.text}">
        <button class="dashboard-col__list-item__btn-delete">✕</button>
      </li>`
    );
  }
}
