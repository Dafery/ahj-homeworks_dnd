import Card from './Card';
import Column from './Column';
import Store from './Store';

import { dashboardTitles } from './consts';

export default class Controller {
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

      this.store.state[id].forEach((item) => {
        const card = new Card(item.key, item.text);
        const addedItem = card.getDashboardColListItem();
        addedItem.addEventListener('mousedown', this.onMouseDown);

        const deleteItemBtn = Card.getDeleteItemBtnByEl(addedItem);
        deleteItemBtn.addEventListener('click', this.onDeleteItem);

        dashboardColList.append(addedItem);
      });
    }

    const dashboardCols = Column.getColsByEl(this.container);
    dashboardCols.forEach((col) => {
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

  onDeleteItem = (e) => {
    const colList = e.target.closest('ul');
    const colListItem = e.target.closest('li');
    this.store.deleteItem(colList.id, colListItem.getAttribute('key'));
    colListItem.remove();
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
    this.listItems = closestList ? Card.getListItemsByEl(closestList) : undefined;

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
