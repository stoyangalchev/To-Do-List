// Layout of header
const buttonDeleteAll = document.createElement('button');
const buttonDeleteAllText = document.createTextNode('Delete All');
const buttonDeleteLast = document.createElement('button');
const buttonDeleteLastText = document.createTextNode('Delete Last');
const inputEnterToDo = document.createElement('input');
const buttonAdd = document.createElement('button');
const buttonAddText = document.createTextNode('Add');

buttonDeleteAll.className = 'header__btn-delete-all';
buttonDeleteLast.className = 'header__btn-delete-last';
inputEnterToDo.className = 'header__input';
inputEnterToDo.placeholder = 'Enter todo ...';
buttonAdd.className = 'header__btn-add';

buttonDeleteAll.append(buttonDeleteAllText);
buttonDeleteLast.append(buttonDeleteLastText);
buttonAdd.append(buttonAddText);

export { buttonDeleteAll, buttonDeleteLast, inputEnterToDo, buttonAdd };