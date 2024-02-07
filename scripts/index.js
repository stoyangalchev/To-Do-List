// Imports ========================================================================================= //

import { root, header, settings, table } from './layout/containers.js';
import { buttonDeleteAll, buttonDeleteLast, inputEnterToDo, buttonAdd } from './layout/header.js';
import { counterAll, counterCompleted, buttonShowAll, buttonShowCompleted, inputSearch } from './layout/settings.js';
import { generateTodo } from './generateTodo.js';
import { getDate } from './getDate.js';

// Layout ========================================================================================= //

// Containers
root.append(header, settings, table);

// Header
header.append(buttonDeleteAll, buttonDeleteLast, inputEnterToDo, buttonAdd);

// Settings
settings.append(counterAll, counterCompleted, buttonShowAll, buttonShowCompleted, inputSearch);

// Variables ========================================================================================= //

let tableTasks = [];
let counterAllTasks = 0;
let counterCompletedTasks = 0;
let counterBtnShowCompletedTasks = 0;
let counterInputSearch = 0;
const tableTasksFromStorage = JSON.parse(localStorage.getItem('tableTasks'));
const TodoConstructor = function (todoText, todoId, isChecked, todoDate) {
  this.todoText = todoText;
  this.todoId = todoId;
  this.isChecked = isChecked;
  this.todoDate = todoDate;
};
const todoCounter = {
  todoAll: 0,
  todoCompleted: 0,
};

// Functions ========================================================================================= //

const setItemLocalStorage = (keyName, keyValue) => {
  return localStorage.setItem(keyName, JSON.stringify(keyValue));
};

const showCompletedTasks = () => {
  let completedTasks = tableTasks.filter(task => task.isChecked);
  if (!completedTasks.length) return;

  table.innerHTML = '';
  completedTasks.forEach(task => {
    table.append(generateTodo(task.todoText, task.todoId, task.isChecked, task.todoDate));
  });
  ++counterBtnShowCompletedTasks;
};

const showAllTasks = () => {
  if (counterBtnShowCompletedTasks === 0 && counterInputSearch === 0) return;

  counterBtnShowCompletedTasks = 0;
  table.innerHTML = '';
  tableTasks.forEach(task => {
    table.append(generateTodo(task.todoText, task.todoId, task.isChecked, task.todoDate));
  });
};

const getTaskFromSearch = () => {
  let targetTask = tableTasks.filter(task => task.todoText.includes(inputSearch.value));
  table.innerHTML = '';
  targetTask.forEach(task => {
    table.append(generateTodo(task.todoText, task.todoId, task.isChecked, task.todoDate));
  });
};

// Events ========================================================================================= //

// Buttons check and close of tasks
table.addEventListener('click', (event) => {
  const { target } = event;
  const { dataset } = target;

  if (target === event.currentTarget) return;

  if (target.className === 'task__label') {
    target.closest('.task').classList.toggle('task--check');
    target.nextSibling.firstChild.classList.toggle('task__text--check');

    const selectedTask = tableTasks.find(task => +task.todoId === +target.closest('.task').dataset.todoId);
    selectedTask.isChecked = !selectedTask.isChecked;

    const selectedTasks = tableTasks.filter(task => task.isChecked);
    todoCounter.todoCompleted = selectedTasks.length;
    counterCompleted.textContent = `Completed: ${selectedTasks.length}`;

    setItemLocalStorage('tableTasks', tableTasks);
    setItemLocalStorage('todoCounter', todoCounter);
  };

  if (dataset.type === 'delete') {
    const parentTask = target.parentNode.parentNode;
    tableTasks = tableTasks.filter(task => +task.todoId !== +parentTask.dataset.todoId);

    --counterAllTasks;
    counterAll.textContent = `All: ${counterAllTasks}`;
    todoCounter.todoAll = counterAllTasks;

    const selectedTasks = tableTasks.filter(task => task.isChecked);
    todoCounter.todoCompleted = selectedTasks.length;
    counterCompleted.textContent = `Completed: ${selectedTasks.length}`;

    parentTask.remove();
    setItemLocalStorage('tableTasks', tableTasks);
    setItemLocalStorage('todoCounter', todoCounter);
  };
});

// Save after update of the page
if (tableTasksFromStorage && tableTasksFromStorage.length) {
  tableTasksFromStorage.forEach(task => {
    table.append(generateTodo(task.todoText, task.todoId, task.isChecked, task.todoDate));
    tableTasks.push(task);
  });

  counterAllTasks = tableTasksFromStorage.length;
  counterAll.textContent = `All: ${counterAllTasks}`;
  todoCounter.todoAll = counterAllTasks;

  counterCompletedTasks = tableTasksFromStorage.filter(task => task.isChecked).length;
  counterCompleted.textContent = `Completed: ${counterCompletedTasks}`;
  todoCounter.todoCompleted = counterCompletedTasks;
};

// Button "Add"
buttonAdd.addEventListener('click', () => {
  if (!inputEnterToDo.value) return;

  const todoId = Date.now();
  const tableTask = new TodoConstructor(inputEnterToDo.value, todoId, false, getDate());

  table.append(generateTodo(inputEnterToDo.value, todoId, false, getDate()));
  tableTasks.push(tableTask);

  ++counterAllTasks;
  counterAll.textContent = `All: ${counterAllTasks}`;
  todoCounter.todoAll = counterAllTasks;
  
  setItemLocalStorage('tableTasks', tableTasks);
  setItemLocalStorage('todoCounter', todoCounter);
  inputEnterToDo.value = '';
});

window.addEventListener('keydown', event => {
  if (event.key === 'Enter') buttonAdd.click();
});

// Button "Delete All"
buttonDeleteAll.addEventListener('click', () => {
  table.innerHTML = '';
  tableTasks.length = 0;
  localStorage.clear();
  counterAllTasks = 0;
  counterCompletedTasks = 0;
  counterAll.textContent = `All: ${counterAllTasks}`;
  counterCompleted.textContent = `Completed: ${counterCompletedTasks}`;
});

// Button "Delete Last"
buttonDeleteLast.addEventListener('click', () => {
  const lastTask = document.querySelector('.table').lastChild;

  tableTasks = tableTasks.splice(0, tableTasks.length - 1);

  counterAllTasks = tableTasks.length;
  counterAll.textContent = `All: ${counterAllTasks}`;
  todoCounter.todoAll = counterAllTasks;

  counterCompletedTasks = tableTasks.filter(task => task.isChecked).length;
  counterCompleted.textContent = `Completed: ${counterCompletedTasks}`;
  todoCounter.todoCompleted = counterCompletedTasks;

  lastTask.remove();
  setItemLocalStorage('tableTasks', tableTasks);
  setItemLocalStorage('todoCounter', todoCounter);
});

// Button "Show Completed"
buttonShowCompleted.addEventListener('click', showCompletedTasks);
// Button "Show All"
buttonShowAll.addEventListener('click', showAllTasks);

// Search
inputSearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (!inputSearch.value) return;
    getTaskFromSearch();
    ++counterInputSearch;
  };
});