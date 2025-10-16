// Element selections (demonstrates getElementById and querySelector)
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const remainingSpan = document.getElementById('remaining');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');

let tasks = []; // will hold { id, text, completed }

// --- Utilities ---
function saveTasks() {
  localStorage.setItem('todo.tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem('todo.tasks');
  tasks = raw ? JSON.parse(raw) : [];
}

// create DOM node for a task
function createTaskNode(task) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = task.id;

  if (task.completed) li.classList.add('completed');

  // checkbox area (clickable)
  const checkbox = document.createElement('button');
  checkbox.className = 'checkbox';
  checkbox.setAttribute('aria-label', task.completed ? 'Mark as incomplete' : 'Mark as complete');
  checkbox.title = task.completed ? 'Mark as incomplete' : 'Mark as complete';
  checkbox.innerHTML = task.completed ? '✓' : '';

  // text
  const span = document.createElement('div');
  span.className = 'todo-text';
  span.textContent = task.text;

  // controls (delete)
  const controls = document.createElement('div');
  controls.className = 'controls-small';

  const del = document.createElement('button');
  del.className = 'delete-btn';
  del.setAttribute('aria-label', 'Delete task');
  del.textContent = '✕';

  controls.appendChild(del);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(controls);

  return li;
}

// render all tasks
function renderTasks() {
  todoList.innerHTML = '';
  if (tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'No tasks yet — add one above!';
    todoList.appendChild(empty);
  } else {
    const frag = document.createDocumentFragment();
    tasks.forEach(task => frag.appendChild(createTaskNode(task)));
    todoList.appendChild(frag);
  }
  updateRemaining();
}

// count remaining
function updateRemaining() {
  const remaining = tasks.filter(t => !t.completed).length;
  remainingSpan.textContent = remaining;
}

// add task
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const newTask = { id: Date.now().toString(), text: trimmed, completed: false };
  tasks.unshift(newTask); // newest on top
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

// toggle complete by id
function toggleComplete(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  saveTasks();
  renderTasks();
}

// delete task by id
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// clear completed
function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

// clear all (with confirmation)
function clearAll() {
  if (!confirm('Clear ALL tasks? This cannot be undone.')) return;
  tasks = [];
  saveTasks();
  renderTasks();
}

// --- Event listeners ---

// add button
addBtn.addEventListener('click', () => addTask(taskInput.value));

// allow Enter to add
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask(taskInput.value);
  }
});

// event delegation on list for mark complete and delete
todoList.addEventListener('click', (e) => {
  // find the li ancestor
  const li = e.target.closest('li.todo-item');
  if (!li) return;

  

  const id = li.dataset.id;

  // if clicked checkbox area or the checkbox button
  if (e.target.closest('.checkbox')) {
    toggleComplete(id);
    return;
  }

  // if clicked delete button
  if (e.target.closest('.delete-btn')) {
    deleteTask(id);
    return;
  }
});

// controls
clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// initialize app
loadTasks();
renderTasks();