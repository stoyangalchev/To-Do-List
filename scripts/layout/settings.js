// Layout of settings
const counterAll = document.createElement('p');
const counterAllText = document.createTextNode('All: 0');
const counterCompleted = document.createElement('p');
const counterCompletedText = document.createTextNode('Completed: 0');
const buttonShowAll = document.createElement('button');
const buttonShowAllText = document.createTextNode('Show All');
const buttonShowCompleted = document.createElement('button');
const buttonShowCompletedText = document.createTextNode('Show Completed');
const inputSearch = document.createElement('input');

counterAll.className = 'settings__counter-all';
counterCompleted.className = 'settings__counter-completed';
buttonShowAll.className = 'settings__btn-show-all';
buttonShowCompleted.className = 'settings__brn-show-completed';
inputSearch.className = 'settings__input';
inputSearch.placeholder = 'Search...';

counterAll.append(counterAllText);
counterCompleted.append(counterCompletedText);
buttonShowAll.append(buttonShowAllText);
buttonShowCompleted.append(buttonShowCompletedText);

export { counterAll, counterCompleted, buttonShowAll, buttonShowCompleted, inputSearch };