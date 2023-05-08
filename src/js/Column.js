import { dashboardTitles } from './consts';
import { createElementFromHTML } from './utils';

export default class Column {
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
    return createElementFromHTML(
      `<section class="dashboard-col">
        <h2 class="dashboard-col__title">${this.title}</h2>
        <ul class="dashboard-col__list" id="${this.id}"></ul>
        <button class="dashboard-col__btn-add-another-card">+ Add another card</button>
        <textarea class="dashboard-col__textarea" placeholder="Enter a title for this card..." hidden></textarea>
        <button class="dashboard-col__btn-add-card" hidden>Add card</button>
        <button class="dashboard-col__btn-close" hidden>✕</button>
      </section>`
    );
  }
}
