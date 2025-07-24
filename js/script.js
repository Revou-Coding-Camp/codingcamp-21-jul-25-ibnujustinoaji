// Data To-Do disimpan di localStorage agar tetap ada saat refresh
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const filterBtn = document.getElementById('filter-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos(list = todos) {
    todoList.innerHTML = '';
    if (list.length === 0) {
        todoList.innerHTML = '<tr><td colspan="4" class="no-task">No task found</td></tr>';
        return;
    }
    list.forEach((todo, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${todo.text}</td>
            <td>${todo.date}</td>
            <td class="${todo.done ? 'status-done' : 'status-pending'}">${todo.done ? 'Done' : 'Pending'}</td>
            <td>
                <button class="action-btn" onclick="toggleStatus(${idx})">${todo.done ? 'Undo' : 'Done'}</button>
                <button class="action-btn" onclick="deleteTodo(${idx})">Delete</button>
            </td>
        `;
        todoList.appendChild(tr);
    });
}

window.toggleStatus = function(idx) {
    todos[idx].done = !todos[idx].done;
    saveTodos();
    renderTodos();
};

window.deleteTodo = function(idx) {
    if (confirm('Delete this task?')) {
        todos.splice(idx, 1);
        saveTodos();
        renderTodos();
    }
};

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    const date = dateInput.value;
    if (!text) {
        alert('Task cannot be empty!');
        return;
    }
    if (!date) {
        alert('Please select a due date!');
        return;
    }
    todos.push({ text, date, done: false });
    saveTodos();
    renderTodos();
    todoForm.reset();
});

filterBtn.addEventListener('click', function() {
    const filterDate = dateInput.value;
    if (!filterDate) {
        renderTodos();
        return;
    }
    const filtered = todos.filter(todo => todo.date === filterDate);
    renderTodos(filtered);
});

deleteAllBtn.addEventListener('click', function() {
    if (todos.length === 0) return;
    if (confirm('Delete all tasks?')) {
        todos = [];
        saveTodos();
        renderTodos();
    }
});

// Render pertama kali
renderTodos(); 