function generateUUID() {
    // Simple UUID generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let todoList = null;
let todoInput = null;
let addButton = null;

// Load todos from local storage
function loadTodos() {
    todoList.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo);
    });
}

// Add todo to DOM
function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    const span = document.createElement('span');
    span.textContent = todo.text;
    li.appendChild(span);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        deleteTodo(todo.id);
    };
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

// Save todo to local storage
function saveTodoToLocalStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Delete todo by id
function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}

document.addEventListener('DOMContentLoaded', () => {
    todoList = document.getElementById('todo-list');
    todoInput = document.getElementById('todo-input');
    addButton = document.getElementById('add-todo');
    // Add todo
    addButton.onclick = () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const todo = { id: generateUUID(), text: todoText };
            addTodoToDOM(todo);
            saveTodoToLocalStorage(todo);
            todoInput.value = '';
        }
        todoInput.focus();
    };
    // Initial load
    loadTodos();
});