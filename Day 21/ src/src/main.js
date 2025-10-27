import { addTodo } from './logic.js';
import { renderTodos } from './ui.js';

document.querySelector('#add-btn').addEventListener('click', () => {
  const input = document.querySelector('#todo-input');
  if (input.value.trim() === '') return;
  addTodo(input.value);
  input.value = '';
  renderTodos();
});

renderTodos();