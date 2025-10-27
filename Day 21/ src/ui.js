import { toggleTodo, getTodos } from './logic.js';

export function renderTodos() {
  const list = document.querySelector('#todo-list');
  list.innerHTML = '';

  getTodos().forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'done' : '';
    li.addEventListener('click', () => {
      toggleTodo(index);
      renderTodos();
    });
    list.appendChild(li);
  });
}