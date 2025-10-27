let todos = [];

export function addTodo(text) {
  todos.push({ text, completed: false });
}

export function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
}

export function getTodos() {
  return todos;
}