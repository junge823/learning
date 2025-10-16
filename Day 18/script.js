// ES6 To-Do App — Clean and Modular

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const taskInput = $('#taskInput');
const addBtn = $('#addBtn');
const todoList = $('#todoList');
const remainingCount = $('#remaining');
const clearCompletedBtn = $('#clearCompleted');
const clearAllBtn = $('#clearAll');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// --- Utility functions ---
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const updateRemaining = () => (remainingCount.textContent = tasks.filter(t => !t.completed).length);

// --- Template for a task ---
const createTaskHTML = ({ id, text, completed }) => `
  <li class="todo-item ${completed ? 'completed' : ''}" data-id="${id}">
    <div class="checkbox">${completed ? '✓' : ''}</div>
    <div class="todo-text">${text}</div>
    <button class="delete-btn">✕</button>
  </li>
`;

// --- Render tasks ---
const renderTasks = () => {
  todoList.innerHTML = tasks.length
    ? tasks.map(createTaskHTML).join('')
    : `<div class="empty">No tasks yet — add one above!</div>`;
  updateRemaining();
};

// --- Add Task ---
const addTask = text => {
  const trimmed = text.trim();
  if (!trimmed) return;
  const newTask = { id: Date.now().toString(), text: trimmed, completed: false };
  tasks = [newTask, ...tasks];
  saveTasks();
  renderTasks();
  taskInput.value = '';
};

// --- Toggle Complete ---
const toggleComplete = id => {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
};

// --- Delete Task ---
const deleteTask = id => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
};

// --- Clear Completed & All ---
const clearCompleted = () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
};

const clearAll = () => {
  if (confirm('Clear ALL tasks? This cannot be undone.')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
};

// --- Event Listeners ---
addBtn.addEventListener('click', () => addTask(taskInput.value));

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask(taskInput.value);
});

todoList.addEventListener('click', e => {
  const li = e.target.closest('.todo-item');
  if (!li) return;

  const id = li.dataset.id;
  if (e.target.classList.contains('checkbox')) toggleComplete(id);
  if (e.target.classList.contains('delete-btn')) deleteTask(id);
});

clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// --- Initial Render ---
renderTasks();