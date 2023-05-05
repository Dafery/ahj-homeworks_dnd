import Store from './Store';

import { createElementFromHTML } from './utils';

export default class Dashboard {
  constructor(container) {
    this.container = container;
    this.store = new Store(JSON.parse(localStorage.getItem('state')));
  }

  static getDashboardColHTML(id, title) {
    return `<section class="dashboard-col">
              <h2 class="dashboard-col__title">${title}</h2>
              <ul class="dashboard-col__list" id="${id}"></ul>
              <button class="dashboard-col__btn-add-another-card">+ Add another card</button>
              <textarea class="dashboard-col__textarea" placeholder="Enter a title for this card..." hidden></textarea>
              <button class="dashboard-col__btn-add-card" hidden>Add card</button>
              <button class="dashboard-col__btn-close" hidden>✕</button>
            </section>`;
  }

  static getDashboardColListItem(key, text) {
    return createElementFromHTML(
      `<li class="dashboard-col__list-item" key="${key}" data-value="${text}">
        <button class="dashboard-col__list-item__btn-delete">✕</button>
      </li>`
    );
  }

  init = () => {
    const dashboardTitles = {
      todo: 'Todo',
      inProgress: 'In progress',
      done: 'Done',
    };

    for (const id in dashboardTitles) {
      this.container.insertAdjacentHTML('beforeend', Dashboard.getDashboardColHTML(id, dashboardTitles[id]));
      const dashboardColList = this.container.querySelector(`#${id}`);

      this.store.state[id].forEach((item) => {
        const addedItem = Dashboard.getDashboardColListItem(item.key, item.text);
        addedItem.addEventListener('mousedown', this.onMouseDown);

        const deleteItemBtn = addedItem.querySelector('button');
        deleteItemBtn.addEventListener('click', (e) => {
          const colList = e.target.closest('ul');
          this.store.deleteItem(colList.id, item.key);
          addedItem.remove();
        });

        dashboardColList.append(addedItem);
      });
    }

    const dashboardCols = this.container.querySelectorAll('.dashboard-col');
    dashboardCols.forEach((col) => {
      const dashboardColList = col.querySelector('.dashboard-col__list');
      const dashboardColBtnAddAnotherCard = col.querySelector('.dashboard-col__btn-add-another-card');
      const dashboardColTextarea = col.querySelector('.dashboard-col__textarea');
      const dashboardColBtnAddCard = col.querySelector('.dashboard-col__btn-add-card');
      const dashboardColBtnClose = col.querySelector('.dashboard-col__btn-close');

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

        const addedItem = Dashboard.getDashboardColListItem(itemKey, dashboardColTextarea.value);
        addedItem.addEventListener('mousedown', this.onMouseDown);

        const deleteItemBtn = addedItem.querySelector('button');
        deleteItemBtn.addEventListener('click', (e) => {
          const colList = e.target.closest('ul');
          this.store.deleteItem(colList.id, itemKey);
          addedItem.remove();
        });

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

  onMouseMove = (e) => {
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
    this.listItems = closestList ? [...closestList.querySelectorAll('li:not(.dragged)')] : undefined;

    if (e.target.tagName === 'UL') {
      return e.layerY < e.target.offsetHeight / 2
        ? e.target.prepend(this.shadowElement)
        : e.target.append(this.shadowElement);
    }
    if (e.target.tagName === 'LI') {
      return e.layerY < e.target.offsetHeight / 2
        ? e.target.before(this.shadowElement)
        : e.target.after(this.shadowElement);
    }

    this.shadowElement.remove();
  };

  onMouseDown = (e) => {
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

  onMouseUp = (e) => {
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
