// Function generateTodo
const generateTodo = (todoText, todoId, isChecked = false, todoDate) => {
    const tableTask = document.createElement('div');
    const inputLabel = document.createElement('label');
    const inputCheck = document.createElement('input');
    const inputBox = document.createElement('i');
    const toDoTextBox = document.createElement('div');
    const toDoText = document.createElement('p');
    const toDoTextText = document.createTextNode(todoText);
    const tableTaskBox = document.createElement('div');
    const buttonClose = document.createElement('button');
    const buttonCloseText = document.createTextNode('❌');
    const date = document.createElement('date');
    const dateText = document.createTextNode(todoDate);
  
    tableTask.className = 'task';
    inputLabel.className = 'task__label';
    inputCheck.className = 'task__check';
    inputBox.className = 'task__checkbox';
    inputBox.style.pointerEvents = "none";
    toDoTextBox.className = 'task__text-box';
    toDoText.className = 'task__text';
    tableTaskBox.className = 'task__box';
    buttonClose.className = 'task__btn-close';
    date.className = 'task__date';
  
    tableTask.className = isChecked ? 'task task--check' : 'task';
    toDoText.className = isChecked ? 'task__text task__text--check' : 'task__text';
    inputCheck.checked = isChecked
    tableTask.dataset.todoId = todoId;
    inputCheck.type = 'checkbox';
    buttonClose.dataset.type = 'delete';
  
    inputLabel.append(inputCheck, inputBox);
    toDoText.append(toDoTextText);
    toDoTextBox.append(toDoText);
    buttonClose.append(buttonCloseText);
    tableTaskBox.append(buttonClose);
    date.append(dateText);
    tableTaskBox.append(date);
    tableTask.append(inputLabel, toDoTextBox, tableTaskBox);
  
    return tableTask;
};

export { generateTodo };